// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as path from 'path';
import { matcher } from 'micromatch';
import { pascalCase } from 'change-case';
import { DeclarationReflection, ProjectReflection, ReflectionKind } from 'typedoc';
import { ComponentDefinition } from './interfaces';
import buildDefinition from './build-definition';
import schema from '../schema';

function returnsReactContent(node: DeclarationReflection) {
  return node.signatures?.some(
    ({ type }) =>
      schema.types.isReferenceType(type) &&
      (type.symbolFullyQualifiedName === 'global.JSX.Element' || type.symbolFullyQualifiedName === 'React.ReactPortal')
  );
}

function findComponent(module: DeclarationReflection) {
  if (!module.children) {
    return null;
  }
  const components: DeclarationReflection[] = [];
  for (const child of module.children) {
    if (child.flags.isExported) {
      switch (child.kind) {
        case ReflectionKind.Function:
          if (returnsReactContent(child)) {
            components.push(child);
          }
          break;
        case ReflectionKind.Variable:
          if (schema.utils.isForwardRefDeclaration(child)) {
            components.push(child);
          }
          break;
      }
    }
  }
  if (components.length > 1) {
    throw new Error(
      `Found multiple exported components in ${module.name}: ${components.map(child => child.name).join(', ')}`
    );
  }
  return components[0];
}

function findProps(allDefinitions: DeclarationReflection[], propsName: string, directoryName: string) {
  const props: DeclarationReflection[] = [];
  const objectInterfaces: DeclarationReflection[] = [];
  for (const child of allDefinitions) {
    if (child.name !== propsName || !schema.utils.getDeclarationSourceFilename(child).includes(directoryName)) {
      continue;
    }

    if (child.kind === ReflectionKind.Interface && child.children) {
      props.push(...child.children);
    }

    if (child.kind === ReflectionKind.Namespace && child.children) {
      for (const subChild of child.children) {
        switch (subChild.kind) {
          case ReflectionKind.TypeAlias:
          case ReflectionKind.Interface:
            objectInterfaces.push(subChild);
            break;
          case ReflectionKind.Property:
            props.push(subChild);
            break;
          default:
            throw new Error(
              `Unknown type ${
                subChild.kindString
              } inside of ${propsName} at ${schema.utils.getDeclarationSourceFilename(subChild)}`
            );
        }
      }
    }
  }

  return {
    props: props,
    objects: objectInterfaces,
  };
}

export default function extractComponents(publicFilesGlob: string, project: ProjectReflection): ComponentDefinition[] {
  const definitions: ComponentDefinition[] = [];
  const isMatch = matcher(path.resolve(publicFilesGlob));

  if (!project.children) {
    return [];
  }

  const allDefinitions = project.children.flatMap(module => {
    if (!module.children) {
      throw new Error(`Module ${module.originalName} does not contain a definition.`);
    }
    return module.children;
  });
  const publicModules = project.children.filter(module => isMatch(module.originalName));

  publicModules.forEach(module => {
    const component = findComponent(module);
    if (component) {
      const directoryName = path.dirname(module.originalName);
      if (component.name !== pascalCase(path.basename(directoryName))) {
        throw new Error(`Component ${component.name} is exported from a mismatched folder: ${directoryName}`);
      }
      const propsNamespace = `${component.name}Props`;
      const { props, objects } = findProps(allDefinitions, propsNamespace, directoryName);
      definitions.push(buildDefinition(component, props, objects));
    }
  });

  return definitions;
}

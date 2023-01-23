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
    ({ type }) => schema.types.isReferenceType(type) && (type.name === 'Element' || type.name === 'ReactPortal')
  );
}

function findComponent(module: DeclarationReflection) {
  const components: DeclarationReflection[] = [];

  switch (module.kind) {
    case ReflectionKind.Function:
      if (returnsReactContent(module)) {
        components.push(module);
      }
      break;
    case ReflectionKind.Variable:
      if (schema.utils.isForwardRefDeclaration(module)) {
        components.push(module);
      }
      break;
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

  if (!project.children) {
    throw new Error('Attempt to analyse empty project');
  }

  project.children.forEach(module => {
    const component = findComponent(module);
    if (component) {
      if (component.name !== 'default') {
        throw new Error(`Component should use default export, found named: ${component.name}`);
      }
      const directoryName = path.dirname(component.sources![0].fullFileName);
      const componentName = pascalCase(path.basename(directoryName));
      const propsNamespace = `${componentName}Props`;
      const { props, objects } = findProps(project.children!, propsNamespace, directoryName);
      definitions.push(buildDefinition(componentName, component, props, objects));
    }
  });

  return definitions;
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { DeclarationReflection, ReflectionKind } from 'typedoc';
import { Type } from 'typedoc/dist/lib/models';
import { ComponentDefinition, ComponentFunction } from './interfaces';
import schema from '../schema';
import buildTypeDefinition from './build-type-definition';
import extractDefaultValues from './default-values-extractor';

function buildEventInfo(handler: DeclarationReflection) {
  if (!schema.types.isReferenceType(handler.type)) {
    throw new Error(
      `Unknown event handler type: ${handler.type && handler.type.type} at ${schema.utils.getDeclarationSourceFilename(
        handler
      )}`
    );
  }
  const detailType = handler.type.typeArguments?.[0];
  const { typeName, typeDefinition } = detailType
    ? getPropertyType(detailType)
    : { typeName: undefined, typeDefinition: undefined };
  return {
    name: handler.name,
    description: schema.code.buildNodeDescription(handler),
    cancelable: handler.type.name !== 'NonCancelableEventHandler',
    detailType: typeName,
    detailInlineType: typeDefinition,
    deprecatedTag: handler.comment?.tags?.find(tag => tag.tagName === 'deprecated')?.text.trim(),
  };
}

function buildMethodsDefinition(refType?: DeclarationReflection): ComponentFunction[] {
  if (!refType || !refType.children) {
    return [];
  }
  return refType.children.map(child => {
    if (!child.signatures) {
      throw new Error(
        `${schema.code.buildFullName(child)} should contain only methods, "${
          child.name
        }" has a "${schema.code.buildType(child.type)}" type`
      );
    }
    if (child.signatures.length > 1) {
      throw new Error(
        `Method overloads are not supported, found multiple signatures at ${schema.utils.getDeclarationSourceFilename(
          child
        )}`
      );
    }
    const signature = child.signatures[0];
    return {
      name: child.name,
      description: schema.code.buildNodeDescription(signature),
      returnType: schema.code.buildType(signature.type),
      parameters:
        signature.parameters?.map(parameter => ({
          name: parameter.name,
          type: schema.code.buildType(parameter.type),
        })) ?? [],
    };
  });
}

function getPropertyType(type?: Type) {
  const typeAlias = schema.types.isReferenceType(type) && (type.reflection as DeclarationReflection | undefined);
  const resolvedType = typeAlias ? typeAlias.type : type;
  if (schema.types.isUnionType(resolvedType)) {
    const subTypes = schema.utils.excludeUndefinedTypeFromUnion(resolvedType);
    if (subTypes.length > 1) {
      if (subTypes.every(type => schema.types.isStringLiteralType(type))) {
        const referenceTypeName = schema.types.isReferenceType(type) ? schema.code.buildType(type) : '';
        const declaration = new DeclarationReflection(referenceTypeName, ReflectionKind.TypeLiteral);
        declaration.type = resolvedType;
        return {
          typeName: 'string',
          typeDefinition: buildTypeDefinition(declaration),
        };
      }
      if (
        subTypes.every(type => schema.types.isIntrinsicType(type) && (type.name === 'true' || type.name === 'false'))
      ) {
        return { typeName: 'boolean' };
      }
    }
  }
  return {
    typeName: schema.code.buildType(type),
    typeDefinition: typeAlias ? buildTypeDefinition(typeAlias) : undefined,
  };
}

export default function buildDefinition(
  component: DeclarationReflection,
  props: DeclarationReflection[],
  objects: DeclarationReflection[]
): ComponentDefinition {
  const events = props.filter(prop => prop.name.match(/^on[A-Z]/));
  const regions = props.filter(prop => ['React.ReactNode', 'ReactNode'].includes(schema.code.buildType(prop.type)));
  const onlyProps = props.filter(prop => !events.includes(prop) && !regions.includes(prop));
  const defaultValues = extractDefaultValues(component);

  const betaTag = component.signatures && component.signatures[0].comment?.tags?.find(tag => tag.tagName === 'beta');
  const versionTag =
    component.signatures && component.signatures[0].comment?.tags?.find(tag => tag.tagName === 'version');

  return {
    name: component.name,
    version: versionTag?.text.trim().replace('\n', ''),
    releaseStatus: betaTag ? 'beta' : 'stable',
    description: schema.code.buildDeclarationDescription(component),
    regions: regions.map(region => {
      return {
        name: region.name,
        displayName: region.comment?.tags?.find(tag => tag.tagName === 'displayname')?.text.trim(),
        description: schema.code.buildNodeDescription(region),
        isDefault: region.name === 'children',
        visualRefreshTag: region.comment?.tags?.find(tag => tag.tagName === 'visualrefresh')?.text.trim(),
        deprecatedTag: region.comment?.tags?.find(tag => tag.tagName === 'deprecated')?.text.trim(),
        i18nTag: region.comment?.tags?.find(tag => tag.tagName === 'i18n')?.text.trim(),
      };
    }),
    functions: buildMethodsDefinition(objects.find(def => def.name === 'Ref')),
    properties: onlyProps.map(prop => {
      const { typeName, typeDefinition } = getPropertyType(prop.type);
      return {
        name: prop.name,
        type: typeName,
        inlineType: typeDefinition,
        optional: schema.utils.isOptionalDeclaration(prop),
        description: schema.code.buildNodeDescription(prop),
        defaultValue: defaultValues[prop.name],
        visualRefreshTag: prop.comment?.tags?.find(tag => tag.tagName === 'visualrefresh')?.text.trim(),
        deprecatedTag: prop.comment?.tags?.find(tag => tag.tagName === 'deprecated')?.text.trim(),
        i18nTag: prop.comment?.tags?.find(tag => tag.tagName === 'i18n')?.text.trim(),
      };
    }),
    events: events.map(handler => buildEventInfo(handler)),
  };
}

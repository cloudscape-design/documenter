// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import ts from 'typescript';

import { extractDeclaration, stringifyType } from './type-utils';
import type {
  ComponentDefinition,
  ComponentFunction,
  ComponentProperty,
  ComponentRegion,
  EventHandler,
} from './interfaces';
import type { ExpandedProp, ExtractedDescription } from './extractor';
import { getObjectDefinition } from './object-definition';

function getCommentTag(description: ExtractedDescription, name: string) {
  const tag = description.tags.find(tag => tag.name === name);
  return tag ? tag.text ?? '' : undefined;
}

function getCommentTags(description: ExtractedDescription, name: string) {
  const tags = description.tags
    .filter(tag => tag.name === name)
    .map(tag => {
      if (!tag.text) {
        throw new Error(`Tag ${name} is missing text`);
      }
      return tag.text;
    });
  return tags.length > 0 ? tags : undefined;
}

function castI18nTag(tag: string | undefined) {
  return tag === undefined ? undefined : true;
}

export function buildComponentDefinition(
  name: string,
  dashCaseName: string,
  props: Array<ExpandedProp>,
  functions: Array<ExpandedProp>,
  defaultValues: Record<string, string>,
  componentDescription: ExtractedDescription,
  checker: ts.TypeChecker
): ComponentDefinition {
  const regions = props.filter(prop => prop.type === 'React.ReactNode');
  const events = props.filter(prop => prop.name.match(/^on[A-Z]/));
  const onlyProps = props.filter(prop => !events.includes(prop) && !regions.includes(prop));

  return {
    name,
    dashCaseName,
    releaseStatus: 'stable',
    description: componentDescription.text,
    systemTags: getCommentTags(componentDescription, 'awsuiSystem'),
    regions: regions.map(
      (region): ComponentRegion => ({
        name: region.name,
        displayName: getCommentTag(region.description, 'displayname'),
        description: region.description.text,
        isDefault: region.name === 'children',
        systemTags: getCommentTags(region.description, 'awsuiSystem'),
        visualRefreshTag: getCommentTag(region.description, 'visualrefresh'),
        deprecatedTag: getCommentTag(region.description, 'deprecated'),
        i18nTag: castI18nTag(getCommentTag(region.description, 'i18n')),
      })
    ),
    functions: functions.map(
      (func): ComponentFunction => ({
        name: func.name,
        description: func.description.text,
        returnType: stringifyType(func.rawType.getNonNullableType().getCallSignatures()[0].getReturnType(), checker),
        parameters: func.rawType
          .getNonNullableType()
          .getCallSignatures()[0]
          .getParameters()
          .map((param): ComponentFunction['parameters'][0] => {
            const paramType = checker.getTypeAtLocation(extractDeclaration(param));
            return {
              name: param.name,
              type: stringifyType(paramType, checker),
            };
          }),
      })
    ),
    properties: onlyProps.map((property): ComponentProperty => {
      const { type, inlineType } = getObjectDefinition(property.type, property.rawType, property.rawTypeNode, checker);
      return {
        name: property.name,
        type: type,
        inlineType: inlineType,
        optional: property.isOptional,
        description: property.description.text,
        defaultValue: defaultValues[property.name],
        systemTags: getCommentTags(property.description, 'awsuiSystem'),
        visualRefreshTag: getCommentTag(property.description, 'visualrefresh'),
        deprecatedTag: getCommentTag(property.description, 'deprecated'),
        analyticsTag: getCommentTag(property.description, 'analytics'),
        i18nTag: castI18nTag(getCommentTag(property.description, 'i18n')),
      };
    }),
    events: events.map((event): EventHandler => {
      const { detailType, detailInlineType, cancelable } = extractEventDetails(
        event.rawType,
        event.rawTypeNode,
        checker
      );
      return {
        name: event.name,
        description: event.description.text,
        cancelable,
        detailType,
        detailInlineType,
        systemTags: getCommentTags(event.description, 'awsuiSystem'),
        deprecatedTag: getCommentTag(event.description, 'deprecated'),
      };
    }),
  };
}

function extractEventDetails(type: ts.Type, typeNode: ts.TypeNode | undefined, checker: ts.TypeChecker) {
  const realType = type.getNonNullableType();
  const handlerName = realType.aliasSymbol?.getName();
  if (handlerName !== 'CancelableEventHandler' && handlerName !== 'NonCancelableEventHandler') {
    throw new Error(`Unknown event handler type: ${checker.typeToString(realType)}`);
  }
  const cancelable = handlerName === 'CancelableEventHandler';
  const detailType = realType.aliasTypeArguments?.[0];
  if (detailType && detailType.getProperties().length > 0) {
    const { type, inlineType } = getObjectDefinition(stringifyType(detailType, checker), detailType, typeNode, checker);
    return {
      detailType: type,
      detailInlineType: inlineType,
      cancelable,
    };
  }
  return { cancelable };
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import ts from 'typescript';
import type { TypeDefinition, UnionTypeDefinition, ValueDescription } from './interfaces';
import { extractDeclaration, extractValueDescriptions, isOptional, stringifyType } from './type-utils';

function isArrayType(type: ts.Type) {
  const symbol = type.getSymbol();
  if (!symbol) {
    return false;
  }
  return symbol.getName() === 'Array' || symbol.getName() === 'ReadonlyArray';
}

export function getObjectDefinition(
  type: string,
  rawType: ts.Type,
  rawTypeNode: ts.TypeNode | undefined,
  checker: ts.TypeChecker
): { type: string; inlineType?: TypeDefinition } {
  const realType = rawType.getNonNullableType();
  const realTypeName = stringifyType(realType, checker);
  if (
    realType.flags & ts.TypeFlags.String ||
    realType.flags & ts.TypeFlags.StringLiteral ||
    realType.flags & ts.TypeFlags.Boolean ||
    realType.flags & ts.TypeFlags.Number ||
    isArrayType(realType) ||
    realTypeName === 'HTMLElement'
  ) {
    // do not expand built-in Javascript methods or primitive values
    return { type };
  }
  if (realType.isUnionOrIntersection()) {
    return getUnionTypeDefinition(realTypeName, realType, rawTypeNode, checker);
  }
  if (realType.getProperties().length > 0) {
    return {
      type: type,
      inlineType: {
        name: realTypeName,
        type: 'object',
        properties: realType
          .getProperties()
          .map(prop => {
            const propType = checker.getTypeAtLocation(extractDeclaration(prop));
            return {
              name: prop.getName(),
              type: stringifyType(propType, checker),
              optional: isOptional(propType),
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name)),
      },
    };
  }
  if (realType.getCallSignatures().length > 0) {
    if (realType.getCallSignatures().length > 1) {
      throw new Error('Multiple call signatures are not supported');
    }
    const signature = realType.getCallSignatures()[0];

    return {
      type,
      inlineType: {
        name: realTypeName,
        type: 'function',
        returnType: stringifyType(signature.getReturnType(), checker),
        parameters: signature.getParameters().map(param => {
          const paramType = checker.getTypeAtLocation(extractDeclaration(param));
          return {
            name: param.getName(),
            type: stringifyType(paramType, checker),
          };
        }),
      },
    };
  }
  return { type };
}

function getPromitiveType(type: ts.UnionOrIntersectionType) {
  if (type.types.every(subtype => subtype.isStringLiteral())) {
    return 'string';
  }
  if (type.types.every(subtype => subtype.isNumberLiteral())) {
    return 'number';
  }
  return undefined;
}

function getUnionTypeDefinition(
  realTypeName: string,
  realType: ts.UnionOrIntersectionType,
  typeNode: ts.TypeNode | undefined,
  checker: ts.TypeChecker
): { type: string; inlineType: UnionTypeDefinition } {
  const valueDescriptions = extractValueDescriptions(realType, typeNode);
  const primitiveType = getPromitiveType(realType);
  const values = realType.types.map(subtype =>
    primitiveType ? (subtype as ts.LiteralType).value.toString() : stringifyType(subtype, checker)
  );

  return {
    type: primitiveType ?? realTypeName,
    inlineType: {
      name: realTypeName,
      type: 'union',
      valueDescriptions: valueDescriptions.length > 0 ? zipValueDescriptions(values, valueDescriptions) : undefined,
      values: values,
    },
  };
}

function zipValueDescriptions(values: Array<string>, descriptions: Array<ValueDescription | undefined>) {
  const descriptionsMap: Record<string, ValueDescription> = {};
  values.forEach((value, index) => {
    const description = descriptions[index];
    if (description) {
      descriptionsMap[value] = description;
    }
  });
  return descriptionsMap;
}

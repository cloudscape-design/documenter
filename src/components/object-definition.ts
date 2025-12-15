// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import ts from 'typescript';
import type { TypeDefinition, UnionTypeDefinition, ValueDescription } from './interfaces';
import { extractDeclaration, isOptional, stringifyType } from '../shared/type-utils';
import { extractValueDescriptions } from './extract-value-descriptions';

function getOriginalTypeName(rawTypeNode: ts.TypeNode) {
  // If the type node is a type reference (like `ButtonGroupProps.Variant`), get its text
  if (ts.isTypeReferenceNode(rawTypeNode) || ts.isQualifiedName(rawTypeNode)) {
    return rawTypeNode.getText();
  }
}

function trimQuotes(s: string) {
  return s.replace(/^"(.+)"$/, '$1');
}

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
  checker: ts.TypeChecker,
): { type: string; inlineType?: TypeDefinition } {
  const realType = rawType.getNonNullableType();
  const realTypeName = stringifyType(realType, checker);

  if (realType.flags & ts.TypeFlags.StringLiteral) {
    // For string literals, try to get the original type name from the type node.
    // This preserves user-defined type aliases like `ButtonGroupProps.Variant`
    const name = (rawTypeNode && getOriginalTypeName(rawTypeNode)) || trimQuotes(realTypeName);

    return {
      type: 'string',
      inlineType: {
        name,
        type: 'union',
        values: [trimQuotes(type)],
      },
    };
  }

  if (
    realType.flags & ts.TypeFlags.String ||
    realType.flags & ts.TypeFlags.Literal ||
    realType.flags & ts.TypeFlags.Boolean ||
    realType.flags & ts.TypeFlags.Number ||
    isArrayType(realType) ||
    realTypeName === 'HTMLElement' ||
    realTypeName.split('.')[0] === 'Highcharts' ||
    type === 'React.ReactNode'
  ) {
    // do not expand built-in Javascript methods or primitive values
    return { type };
  }
  if (realType.isUnionOrIntersection()) {
    return getUnionTypeDefinition(realTypeName, realType, rawTypeNode, checker);
  }
  if (realType.getProperties().length > 0) {
    const properties = realType
      .getProperties()
      .map(prop => {
        const propNode = extractDeclaration(prop) as ts.PropertyDeclaration;
        const propType = checker.getTypeAtLocation(propNode);
        const typeString = stringifyType(propType, checker);

        return {
          name: prop.getName(),
          optional: isOptional(propType),
          ...getObjectDefinition(typeString, propType, propNode.type, checker),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    return {
      type: type,
      inlineType: {
        name: realTypeName.length < 100 ? realTypeName : 'object',
        type: 'object',
        properties: properties,
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

function getPrimitiveType(type: ts.UnionOrIntersectionType) {
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
  checker: ts.TypeChecker,
): { type: string; inlineType: UnionTypeDefinition } {
  const valueDescriptions = extractValueDescriptions(realType, typeNode);
  const primitiveType = getPrimitiveType(realType);
  const values = realType.types.map(subtype =>
    primitiveType ? (subtype as ts.LiteralType).value.toString() : stringifyType(subtype, checker),
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

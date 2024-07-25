// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { DeclarationReflection, Reflection, SignatureReflection } from 'typedoc';
import { FunctionDefinition, ObjectDefinition, UnionTypeDefinition } from './interfaces';
import schema from '../schema';
import { StringLiteralType, UnionType } from 'typedoc/dist/lib/models';

function buildObjectDefinition(obj: DeclarationReflection): ObjectDefinition {
  return {
    name: schema.code.buildFullName(obj),
    type: 'object',
    properties:
      obj.children?.map(prop => ({
        name: prop.name,
        type: prop.signatures ? schema.code.buildCallSignature(prop.signatures[0]) : schema.code.buildType(prop.type),
        optional: schema.utils.isOptionalDeclaration(prop),
      })) ?? [],
  };
}

function buildFunctionDefinition(obj: Reflection, signature: SignatureReflection): FunctionDefinition {
  return {
    name: schema.code.buildFullName(obj),
    type: 'function',
    returnType: schema.code.buildType(signature.type),
    parameters:
      signature.parameters?.map(parameter => ({
        name: parameter.name,
        type: schema.code.buildType(parameter.type),
      })) ?? [],
  };
}

function buildUnionTypeDefinition(obj: DeclarationReflection, type: UnionType): UnionTypeDefinition {
  return {
    name: schema.code.buildFullName(obj),
    type: 'union',
    values: type.types.map(type => {
      const result = schema.code.buildType(type);
      try {
        return JSON.parse(result);
      } catch (e) {
        // ignore json parse errors
      }
      return result;
    }),
  };
}

// Treat string literal type as a union with a single element.
function buildStringLiteralTypeDefinition(obj: DeclarationReflection, type: StringLiteralType): UnionTypeDefinition {
  return {
    name: schema.code.buildFullName(obj),
    type: 'union',
    values: [
      (() => {
        const result = schema.code.buildType(type);
        try {
          return JSON.parse(result);
        } catch (e) {
          // ignore json parse errors
        }
        /* istanbul ignore next */
        return result;
      })(),
    ],
  };
}

export default function buildTypeDefinition(
  obj: DeclarationReflection
): ObjectDefinition | FunctionDefinition | UnionTypeDefinition {
  // Use the original public name (e.g. ComponentProps.Something) for type aliases
  const fullName = schema.code.buildFullName(obj);
  if (schema.types.isReflectionType(obj.type)) {
    obj = obj.type.declaration;
  }

  let definition;
  if (schema.types.isUnionType(obj.type)) {
    definition = buildUnionTypeDefinition(obj, obj.type);
  }

  if (schema.types.isStringLiteralType(obj.type)) {
    definition = buildStringLiteralTypeDefinition(obj, obj.type);
  }

  if (obj.signatures) {
    definition = buildFunctionDefinition(obj.parent!, obj.signatures[0]);
  }

  if (schema.types.isReferenceType(obj.type) && obj.type.reflection) {
    definition = buildObjectDefinition(obj.type.reflection as DeclarationReflection);
  }

  if (!definition) {
    definition = buildObjectDefinition(obj);
  }

  definition.name = fullName;
  return definition;
}

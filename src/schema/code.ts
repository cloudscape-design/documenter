// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Reflection, ReflectionKind, DeclarationReflection, SignatureReflection, Type } from 'typedoc/dist/lib/models';
import {
  isReflectionType,
  isReferenceType,
  isArrayType,
  isIntrinsicType,
  isStringLiteralType,
  isUnionType,
  isTupleType,
  isTypeParameter,
} from './types';
import { excludeUndefinedTypeFromUnion } from './utils';

export function buildFullName(reflection: Reflection): string {
  const result = [reflection.name];
  while (reflection.parent && reflection.parent.kind !== ReflectionKind.Module) {
    reflection = reflection.parent;
    result.push(reflection.name);
  }
  return result.reverse().join('.');
}

export function buildCallSignature(signature: SignatureReflection, enclose = false): string {
  const parameters = signature.parameters
    ?.map(parameter => `${parameter.name}: ${buildType(parameter.type)}`)
    .join(', ');
  const call = `(${parameters ?? ''}) => ${buildType(signature.type)}`;
  return enclose ? `(${call})` : call;
}

export function buildType(type?: Type, enclose = false): string {
  if (type) {
    if (isReflectionType(type)) {
      const reflected = type.declaration;
      if (reflected.signatures && reflected.signatures[0]) {
        return buildCallSignature(reflected.signatures[0], enclose);
      }
      return buildType(type.declaration.type);
    }
    if (isReferenceType(type)) {
      let name = (type.reflection && buildFullName(type.reflection)) ?? type.name;
      if (type.typeArguments) {
        name += `<${type.typeArguments.map(type => buildType(type)).join(', ')}>`;
      }
      return name;
    }
    if (isArrayType(type)) {
      const elementType = buildType(type.elementType);
      return `Array<${elementType}>`;
    }
    if (isIntrinsicType(type) || isTypeParameter(type)) {
      return type.name;
    }
    if (isStringLiteralType(type)) {
      return JSON.stringify(type.value);
    }
    if (isUnionType(type)) {
      const defined = excludeUndefinedTypeFromUnion(type);
      return defined
        .map(type => buildType(type, defined.length > 1))
        .sort()
        .join(' | ');
    }
    if (isTupleType(type)) {
      return `[${[type.elements.map(posType => buildType(posType))].join(', ')}]`;
    }
    return type.type;
  }
  return 'unknown';
}

export function buildNodeDescription(node: Reflection): string | undefined {
  if (node.comment) {
    return node.comment.text ? `${node.comment.shortText}\n${node.comment.text}` : node.comment.shortText;
  }
}

export function buildDeclarationDescription(declaration: DeclarationReflection): string | undefined {
  if (declaration.comment) {
    return buildNodeDescription(declaration);
  }
  const signatureWithComment = declaration.signatures?.find(signature => signature.comment);
  if (signatureWithComment) {
    return buildNodeDescription(signatureWithComment);
  }
}

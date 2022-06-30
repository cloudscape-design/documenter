// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import {
  ArrayType,
  IntrinsicType,
  ReferenceType,
  ReflectionType,
  StringLiteralType,
  TupleType,
  Type,
  TypeParameterType,
  UnionType,
} from 'typedoc/dist/lib/models';

export function isStringLiteralType(type?: Type): type is StringLiteralType {
  return type !== undefined && type.type === 'stringLiteral';
}

export function isReferenceType(type?: Type): type is ReferenceType {
  return type !== undefined && type.type === 'reference';
}

export function isIntrinsicType(type?: Type): type is IntrinsicType {
  return type !== undefined && type.type === 'intrinsic';
}

export function isReflectionType(type?: Type): type is ReflectionType {
  return type !== undefined && type.type === 'reflection';
}

export function isArrayType(type?: Type): type is ArrayType {
  return type !== undefined && type.type === 'array';
}

export function isUnionType(type?: Type): type is UnionType {
  return type !== undefined && type.type === 'union';
}

export function isTypeParameter(type?: Type): type is TypeParameterType {
  return type !== undefined && type.type === 'typeParameter';
}

export function isTupleType(type?: Type): type is TupleType {
  return type !== undefined && type.type === 'tuple';
}

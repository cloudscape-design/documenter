// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import {
  ArrayType,
  IntrinsicType,
  ReferenceType,
  ReflectionType,
  LiteralType,
  TupleType,
  Type,
  UnionType,
} from 'typedoc/dist/lib/models';

export function isStringLiteralType(type?: Type): type is LiteralType {
  return type !== undefined && type.type === 'literal';
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

export function isTupleType(type?: Type): type is TupleType {
  return type !== undefined && type.type === 'tuple';
}

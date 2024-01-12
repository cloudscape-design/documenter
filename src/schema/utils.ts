// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { DeclarationReflection, Type, UnionType } from 'typedoc/dist/lib/models';
import { isIntrinsicType, isReferenceType, isTypeParameter, isUnionType } from './types';

export function isOptionalDeclaration(prop: DeclarationReflection): boolean {
  if (prop.flags.isOptional) {
    return true;
  }
  const type = prop.type;
  return type !== undefined && isUnionType(type) && type.types.find(isTypeUndefined) !== undefined;
}

export function isForwardRefDeclaration({ type, name }: DeclarationReflection): boolean {
  const isForwardRef =
    isReferenceType(type) && type.symbolFullyQualifiedName.endsWith('React.ForwardRefExoticComponent');
  const isParametrizedForwardRef = Boolean(
    isReferenceType(type) &&
      type.name === `${name}ForwardRefType` &&
      (type.reflection as DeclarationReflection | undefined)?.signatures?.some(({ name, type }) => {
        return name === '__call' && isReferenceType(type) && type.symbolFullyQualifiedName.endsWith('JSX.Element');
      })
  );
  return isForwardRef || isParametrizedForwardRef;
}

export function getDeclarationSourceFilename(declaration: DeclarationReflection): string {
  return declaration.sources?.[0].file?.fullFileName ?? 'unknown location';
}

export function excludeUndefinedTypeFromUnion(type: UnionType): Type[] {
  return type.types.filter(isTypeDefined);
}

export function isTypeDefined(type?: Type): boolean {
  if (type && type.type === 'undefined') {
    return false;
  }
  if (isIntrinsicType(type) || isTypeParameter(type)) {
    return type.name !== 'undefined';
  }
  if (isUnionType(type)) {
    return excludeUndefinedTypeFromUnion(type).length > 0;
  }
  return true;
}

export function isTypeUndefined(type?: Type): boolean {
  return !isTypeDefined(type);
}

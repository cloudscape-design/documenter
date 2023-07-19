// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import ts from 'typescript';

export const printer = ts.createPrinter({ omitTrailingSemicolon: true, noEmitHelpers: true });

const TYPE_FORMAT_FLAGS =
  ts.TypeFormatFlags.UseFullyQualifiedType |
  ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope |
  ts.TypeFormatFlags.WriteArrayAsGenericType;

export function isTruthy<T>(t: T): t is Exclude<T, undefined | null | false | '' | 0> {
  return !!t;
}

export function typeToString(program: ts.Program, type: ts.Type, noQuotesAroundStringLiterals?: boolean): string {
  if (noQuotesAroundStringLiterals && type.isStringLiteral()) {
    // This is how `UnionTypeDefinition` expects types to be stringed.
    return type.value;
  }
  return program.getTypeChecker().typeToString(type, undefined, TYPE_FORMAT_FLAGS);
}

export function joinSymbolDisplayParts(parts?: ts.SymbolDisplayPart[]): string | undefined {
  return parts?.map(part => part.text).join('');
}

export function sortSymbolsByName(input: ts.Symbol[]): ts.Symbol[] {
  return [...input].sort();
}

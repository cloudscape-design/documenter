// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as assert from 'node:assert';
import ts from 'typescript';

const printer = ts.createPrinter({ omitTrailingSemicolon: true, noEmitHelpers: true, removeComments: true });

const TYPE_FORMAT_FLAGS =
  ts.TypeFormatFlags.UseFullyQualifiedType |
  ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope |
  ts.TypeFormatFlags.WriteArrowStyleSignature |
  ts.TypeFormatFlags.WriteTypeArgumentsOfSignature |
  ts.TypeFormatFlags.WriteArrayAsGenericType;

export function isTruthy<T>(t: T): t is Exclude<T, undefined | null | false | '' | 0> {
  return !!t;
}

export function nodeToString(sourceFile: ts.SourceFile, node: ts.Node, hint: ts.EmitHint): string {
  return printer.printNode(hint, node, sourceFile);
}

export function typeToString(program: ts.Program, type: ts.Type, noQuotesAroundStringLiterals?: boolean): string {
  if (noQuotesAroundStringLiterals && type.isStringLiteral()) {
    // This is how `UnionTypeDefinition` expects types to be stringed.
    return type.value;
  }
  return program.getTypeChecker().typeToString(type, undefined, TYPE_FORMAT_FLAGS);
}

export function signatureDeclarationToString(program: ts.Program, declaration: ts.SignatureDeclaration): string {
  const signature = program.getTypeChecker().getSignatureFromDeclaration(declaration);
  assert.ok(signature, 'Could not get signature from declaration');
  return program.getTypeChecker().signatureToString(signature, undefined, TYPE_FORMAT_FLAGS);
}

export function joinSymbolDisplayParts(parts?: ts.SymbolDisplayPart[]): string | undefined {
  return parts?.map(part => part.text).join('');
}

export function sortSymbolsByName(input: ts.Symbol[]): ts.Symbol[] {
  return [...input].sort((a, b) => a.getName().localeCompare(b.getName()));
}

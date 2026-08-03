// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import ts from 'typescript';
import { test, expect } from 'vitest';
import { printFlags, tryExtractDeclaration } from '../../src/shared/type-utils';
import { getInMemoryProject } from '../components/test-helpers';

test('serialises node flags', () => {
  const flags = printFlags(
    ts.NodeFlags.HasAsyncFunctions + ts.NodeFlags.HasImplicitReturn + ts.NodeFlags.ContainsThis,
    ts.NodeFlags,
  );
  expect(flags).toContain('HasAsyncFunctions');
  expect(flags).toContain('HasImplicitReturn');
  expect(flags).toContain('ContainsThis');
});

test('serialises type flags', () => {
  const flags = printFlags(ts.TypeFlags.Number + ts.TypeFlags.Enum, ts.TypeFlags);
  expect(flags).toContain('Number');
  expect(flags).toContain('Enum');
});

test('tryExtractDeclaration returns undefined for symbols with no declarations', () => {
  const symbol = { getDeclarations: () => undefined } as unknown as ts.Symbol;
  expect(tryExtractDeclaration(symbol)).toBeUndefined();
});

test('tryExtractDeclaration returns the single declaration', () => {
  const decl = {} as ts.Declaration;
  const symbol = { getDeclarations: () => [decl] } as unknown as ts.Symbol;
  expect(tryExtractDeclaration(symbol)).toBe(decl);
});

test('tryExtractDeclaration picks non-never property signature from multiple declarations', () => {
  const { exportSymbol, checker } = getInMemoryProject(`
    interface BranchA { shared: string; }
    interface BranchB { shared?: never; }
    export type Combined = BranchA | BranchB;
  `);
  const combinedType = checker.getDeclaredTypeOfSymbol(exportSymbol);
  const sharedSymbol = combinedType.getProperties().find(p => p.getName() === 'shared')!;
  const declaration = tryExtractDeclaration(sharedSymbol);
  expect(declaration).toBeDefined();
  // Should pick the BranchA declaration (non-never)
  if (declaration && ts.isPropertySignature(declaration) && declaration.type) {
    expect(declaration.type.kind).not.toBe(ts.SyntaxKind.NeverKeyword);
  }
});

test('tryExtractDeclaration keeps a property signature that has no type annotation', () => {
  const { exportSymbol, checker } = getInMemoryProject(`
    interface BranchA { shared; }
    interface BranchB { shared?: never; }
    export type Combined = BranchA | BranchB;
  `);
  const combinedType = checker.getDeclaredTypeOfSymbol(exportSymbol);
  const sharedSymbol = combinedType.getProperties().find(p => p.getName() === 'shared')!;
  const declaration = tryExtractDeclaration(sharedSymbol);
  expect(declaration).toBeDefined();
  expect(ts.isPropertySignature(declaration!)).toBe(true);

  expect((declaration as ts.PropertySignature).type).toBeUndefined();
});

test('tryExtractDeclaration throws when multiple non-never declarations are ambiguous', () => {
  // Three property signature declarations, two of which are non-never (`string` and `number`).
  // The result is ambiguous, so no single declaration can be chosen and the function throws.
  const { exportSymbol, checker } = getInMemoryProject(`
    interface BranchA { shared: string; }
    interface BranchB { shared: number; }
    interface BranchC { shared?: never; }
    export type Combined = BranchA | BranchB | BranchC;
  `);
  const combinedType = checker.getDeclaredTypeOfSymbol(exportSymbol);
  const sharedSymbol = combinedType.getProperties().find(p => p.getName() === 'shared')!;
  expect(() => tryExtractDeclaration(sharedSymbol)).toThrow('Multiple declarations found for symbol: shared');
});

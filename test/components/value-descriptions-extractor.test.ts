// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from 'vitest';
import ts from 'typescript';
import { extractDeclaration, extractValueDescriptions } from '../../src/components/type-utils';
import { getInMemoryProject } from './test-helpers';

function extractFromSource(source: string) {
  const { exportSymbol, checker } = getInMemoryProject(source);

  const exportType = extractDeclaration(exportSymbol) as ts.TypeAliasDeclaration;
  return extractValueDescriptions(checker.getTypeAtLocation(exportType) as ts.UnionOrIntersectionType, exportType.type);
}

test('does not extract anything if union type has no comments', () => {
  const source = `export type MyUnion =
  | 'foo'
  | 'bar';`;

  expect(extractFromSource(source)).toEqual([]);
});

test('does not extract anything if this is not a type', () => {
  const source = `export const test = 'true'`;

  expect(extractFromSource(source)).toEqual([]);
});

test('extract description comments', () => {
  const source = `export type MyUnion =
  /** @awsuiSystem fooSystem */
  | 'foo'
  /** @awsuiSystem barSystem */
  | 'bar';`;

  expect(extractFromSource(source)).toEqual([{ systemTags: ['fooSystem'] }, { systemTags: ['barSystem'] }]);
});

test('extract description comments from a type alias', () => {
  const source = `
  export type MyUnion = InternalUnion;
  type InternalUnion =
  /** @awsuiSystem fooSystem */
  | 'foo'
  /** @awsuiSystem barSystem */
  | 'bar';`;

  expect(extractFromSource(source)).toEqual([{ systemTags: ['fooSystem'] }, { systemTags: ['barSystem'] }]);
});

test('allows some members without comments', () => {
  const source = `export type MyUnion =
  'foo'
  /** @awsuiSystem barSystem */
  | 'bar'
  | 'baz'
  /** @awsuiSystem quxSystem */
  | 'qux'
  ;`;

  expect(extractFromSource(source)).toEqual([
    undefined,
    { systemTags: ['barSystem'] },
    undefined,
    { systemTags: ['quxSystem'] },
  ]);
});

test('ignores leading and trailing comments', () => {
  const source = `
  /** @awsuiSystem willNotBeParsed */
  export type MyUnion =
  /** @awsuiSystem fooSystem */
  | 'foo'
  /** @awsuiSystem barSystem */
  | 'bar'
  /** @awsuiSystem willNotBeParsedToo */
  ;`;

  expect(extractFromSource(source)).toEqual([{ systemTags: ['fooSystem'] }, { systemTags: ['barSystem'] }]);
});

test('merges comments before and after bar character', () => {
  const source = `export type MyUnion =
  /** @awsuiSystem fooBefore */
  | /** @awsuiSystem fooAfter */ 'foo'
  /** @awsuiSystem barSystem */
  | 'bar'
  ;`;

  expect(extractFromSource(source)).toEqual([{ systemTags: ['fooBefore', 'fooAfter'] }, { systemTags: ['barSystem'] }]);
});

test('extracts multiple tags from a single comment', () => {
  const source = `export type MyUnion =
  | 'foo'
  /** 
   * @awsuiSystem barFirst 
   * @awsuiSystem barSecond 
   */
  | 'bar'
  ;`;

  expect(extractFromSource(source)).toEqual([undefined, { systemTags: ['barFirst', 'barSecond'] }]);
});

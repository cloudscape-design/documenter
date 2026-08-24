// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { expect, test } from 'vitest';

import * as ts from 'ts-morph';

import { toProxySource } from '../../src/api-gen/to-proxy-source';
import { describe } from 'node:test';

function transform(declarations: string) {
  const project = new ts.Project({
    useInMemoryFileSystem: true,
    manipulationSettings: { indentationText: ts.IndentationText.TwoSpaces },
  });
  return toProxySource(project, 'demo/interfaces.ts', declarations).getFullText();
}

describe('strips license header', () => {
  const HEADER =
    '// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.\n// SPDX-License-Identifier: Apache-2.0\n';
  const SOURCE = 'export type A = string;';

  test('strips the license header and trailing \n', () => {
    expect(transform(`${HEADER}${SOURCE}`)).toBe(SOURCE);
    expect(transform(`${HEADER}\n${SOURCE}`)).toBe(`${SOURCE}`);
    expect(transform(`${HEADER}\n\n${SOURCE}`)).toBe(`${SOURCE}`);
    expect(transform(`${HEADER} ${SOURCE}`)).toBe(` ${SOURCE}`);
  });

  test('leaves a header that is not at the start of the source untouched', () => {
    expect(transform(`\n${HEADER}${SOURCE}`)).toBe(`\n${HEADER}${SOURCE}`);
  });

  test('strips a license header with CRLF line endings', () => {
    expect(transform(`${HEADER.replace(/\n/g, '\r\n')}${SOURCE}`)).toBe(SOURCE);
  });
});

describe('strips system tags', () => {
  const inline = (input: string) => input.replace(/[ \t\n]+/g, ' ');

  test('leaves a comment without annotations untouched', () => {
    [
      'export type X = Y;',
      `/**
        * API docs
        */
      export type X = Y;`,
      `/**
        * API docs
        * @deprecated
        */
      export type X = Y; `,
    ].forEach(input => {
      expect(transform(input)).toBe(input);
    });
  });

  test('drops a comment that holds nothing but the annotation', () => {
    [
      `/** @awsuiSystem core */
      export type X = Y; `,
      `/**
        * @awsuiSystem experimental
        */
      export type X = Y;`,
      `/**
        * @awsuiSystem core
        * @awsuiSystem experimental
        */
      export type X = Y;`,
    ].forEach(input => {
      expect(transform(input).trim()).toBe('export type X = Y;');
    });
  });

  test('drops the annotation but keeps the api-docs beside it', () => {
    [
      [
        `/** API docs @awsuiSystem core */
        export type X = Y;`,
        `/** API docs */ export type X = Y;`,
      ],
      [
        `/**
          * API docs
          * @awsuiSystem core
          */
        export type X = Y;`,
        `/** * API docs */ export type X = Y;`,
      ],
      [
        `/**
          * API docs
          * @awsuiSystem core
          * @deprecated
          */
        export type X = Y;`,
        `/** * API docs * @deprecated */ export type X = Y;`,
      ],
    ].forEach(([input, expectation]) => expect(inline(transform(input))).toBe(expectation));
  });

  test('drops annotation from an interface member', () => {
    [
      [
        `interface I {
          /** @awsuiSystem core */
          x: Y;
        }`,
        `interface I { x: Y; }`,
      ],
      [
        `interface I {
          /** 
           * API docs
           * @awsuiSystem core
           */
          x: Y;
        }`,
        `interface I { /** * API docs */ x: Y; }`,
      ],
    ].forEach(([input, expectation]) => expect(inline(transform(input))).toBe(expectation));
  });
});

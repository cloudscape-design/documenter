// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from 'vitest';
import { buildTestUtilsProject } from './test-helpers';

describe('documentTestUtils throws error for ', () => {
  test('failing project generation because of invalid config', () => {
    expect(() => buildTestUtilsProject('errors-config')).toThrow('Failed to parse tsconfig.json');
  });

  test('failing project generation because of faulty project files', () => {
    expect(() => buildTestUtilsProject('errors-types')).toThrow('Compilation failed');
  });

  test('having no input files because of the config', () => {
    expect(() => buildTestUtilsProject('errors-empty')).toThrow('Failed to parse tsconfig.json');
  });

  test('throws error on unknown export', () => {
    expect(() => buildTestUtilsProject('errors-no-wrapper-classes')).toThrow(
      'Exported symbol is not a class, got speakTruth'
    );
  });

  test('having no input files because of a non-matching glob', () => {
    expect(() =>
      buildTestUtilsProject(
        'simple',
        {},
        {
          root: 'fixtures/does-not-exist/index.ts',
        }
      )
    ).toThrow(/File '.*fixtures\/does-not-exist\/index.ts' not found/);
  });
});

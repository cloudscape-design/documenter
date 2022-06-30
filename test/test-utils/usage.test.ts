// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildTestUtilsProject } from '../components/test-helpers';

// TODO: Move typedoc project generation functionality to a common place
describe('documentTestUtils throws error for ', () => {
  test('failing project generation because of invalid config', () => {
    expect(() => buildTestUtilsProject('errors-config')).toThrow('Errors during parsing configuration');
  });

  test('failing project generation because of faulty project files', () => {
    expect(() => buildTestUtilsProject('errors-types')).toThrow('Project generation failed');
  });

  test('having no input files because of the config', () => {
    expect(() => buildTestUtilsProject('errors-empty')).toThrow('Errors during parsing configuration');
  });

  test('having no input files because of a non-matching glob', () => {
    expect(() => buildTestUtilsProject('simple', 'thisGlobWontMatchAnything')).toThrow('No input files to convert');
  });
});

test('glob works', () => {
  const results = buildTestUtilsProject('glob-test', '**/a.ts');
  expect(results.length).toBe(1);
  expect(results[0].name).toBe('A');
});

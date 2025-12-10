// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from 'vitest';
import { buildProject } from './test-helpers';

test('should throw in case of configuration errors', () => {
  expect(() => buildProject('errors-config')).toThrow('Failed to parse tsconfig.json');
});

test('should throw if tsconfig is not found', () => {
  expect(() => buildProject('fixture-does-not-exist')).toThrow('Failed to read tsconfig.json');
});

test('should throw if no components in the output', () => {
  expect(() => buildProject('simple', { publicFilesGlob: 'does-not-exist' })).toThrow(
    'No files found matching does-not-exist',
  );
});

test('should throw in case of type errors', () => {
  expect(() => buildProject('errors-types')).toThrow('Compilation failed');
});

test('should throw error when component exported without default export', () => {
  expect(() => buildProject('error-no-default-export')).toThrow('Missing default export for Component');
});

test('should throw error when there are unexpected exports', () => {
  expect(() => buildProject('custom-exports')).toThrow('Unexpected exports in Button: InternalButton');
});

test('should throw error if default export is not a react component', () => {
  expect(() => buildProject('error-not-a-component')).toThrow('Unknown default export type () => { type: string; }');
});

test('should throw error if event handler has an invalid type', () => {
  expect(() => buildProject('unknown-event-handler')).toThrow('Unknown event handler type: string');
});

test('should throw error if component ref contains function overloads', () => {
  expect(() => buildProject('error-ref-overload')).toThrow('Multiple declarations found for symbol: focus');
});

test('should throw error if component ref contains non-method properties', () => {
  expect(() => buildProject('error-ref-property-type')).toThrow(
    'ButtonProps.Ref should contain only methods, "value" has a "string" type',
  );
});

test('should throw error if component does not export a props namespace', () => {
  expect(() => buildProject('error-missing-props')).toThrow(/Missing ButtonProps export/);
});

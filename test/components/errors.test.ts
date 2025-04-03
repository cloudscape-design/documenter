// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';

test('should throw in case of configuration errors', () => {
  expect(() => buildProject('errors-config')).toThrow('Failed to parse tsconfig.json');
});

test('should throw in case of type errors', () => {
  expect(() => buildProject('errors-types')).toThrow('Compilation failed');
});

test('should throw error when multiple components exported from the main file', () => {
  expect(() => buildProject('ambiguous-exports')).toThrow('Missing default export for Component');
});

test('should throw error if event handler has an invalid type', () => {
  expect(() => buildProject('unknown-event-handler')).toThrow('Unknown event handler type: string');
});

// TODO cannot find Ref export
test.skip('should throw error if component ref contains function overloads', () => {
  expect(() => buildProject('error-ref-overload')).toThrow(
    'Method overloads are not supported, found multiple signatures'
  );
});

// TODO cannot find Ref export
test.skip('should throw error if component ref contains non-method properties', () => {
  expect(() => buildProject('error-ref-property-type')).toThrow(
    'ButtonProps.Ref.value should contain only methods, "value" has a "string" type'
  );
});

test('should throw error if component does not export a props namespace', () => {
  expect(() => buildProject('error-missing-props')).toThrow(/Missing ButtonProps export/);
});

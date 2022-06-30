// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';

test('should throw in case of configuration errors', () => {
  expect(() => buildProject('errors-config')).toThrow('Errors during parsing configuration');
});

test('should throw in case of type errors', () => {
  expect(() => buildProject('errors-types')).toThrow('Project generation failed');
});

test('should throw error when multiple components exported from the main file', () => {
  expect(() => buildProject('ambiguous-exports')).toThrow(
    'Found multiple exported components in "index": AlsoButton, Button'
  );
});

test('should throw error if event handler has an invalid type', () => {
  expect(() => buildProject('unknown-event-handler')).toThrow('Unknown event handler type: intrinsic');
});

test('should throw error if component ref contains function overloads', () => {
  expect(() => buildProject('error-ref-overload')).toThrow(
    'Method overloads are not supported, found multiple signatures'
  );
});

test('should throw error if component ref contains non-method properties', () => {
  expect(() => buildProject('error-ref-property-type')).toThrow(
    'ButtonProps.Ref.value should contain only methods, "value" has a "string" type'
  );
});

test('should throw error if component name does not match the folder name', () => {
  expect(() => buildProject('error-incorrect-component-name')).toThrow(
    /Component Input is exported from a mismatched folder: .*\/button/
  );
});

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test, beforeAll } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let codeEditor: ComponentDefinition;

beforeAll(() => {
  const result = buildProject('simple');
  expect(result).toHaveLength(1);
  [codeEditor] = result;
});

test('object definition should handle basic types', () => {
  // Test that the object definition functions work correctly
  expect(codeEditor.name).toBe('Simple');
  expect(codeEditor.properties).toBeDefined();
});

test('object definition should handle union types correctly', () => {
  // Test basic union type handling
  const unionProp = codeEditor.properties.find(def => def.inlineType?.type === 'union');

  if (unionProp?.inlineType?.type === 'union') {
    expect(unionProp.inlineType.values).toBeDefined();
    expect(Array.isArray(unionProp.inlineType.values)).toBe(true);
  }
});

test('object definition should preserve type information', () => {
  // Test that type information is preserved correctly
  const props = codeEditor.properties;
  expect(props.length).toBeGreaterThan(0);

  props.forEach(prop => {
    expect(prop.name).toBeDefined();
    expect(prop.type).toBeDefined();
  });
});

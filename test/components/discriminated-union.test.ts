// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test, beforeAll } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let list: ComponentDefinition;

beforeAll(() => {
  const result = buildProject('discriminated-union');
  expect(result).toHaveLength(1);

  list = result[0];
});

test('should extract properties from discriminated union without errors', () => {
  expect(list.name).toBe('List');
  const propNames = list.properties.map(p => p.name);
  expect(propNames).toContain('items');
  expect(propNames).toContain('renderItem');
  expect(propNames).toContain('activeItem');
});

test('should use the non-never declaration type for shared properties', () => {
  const renderProp = list.properties.find(p => p.name === 'renderItem')!;
  expect(renderProp).toBeDefined();
  expect(renderProp.type).toBe('() => React.ReactNode');
});

test('should preserve description from discriminated union properties', () => {
  const renderProp = list.properties.find(p => p.name === 'renderItem')!;
  expect(renderProp.description).toBeDefined();
});

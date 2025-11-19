// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test, beforeAll } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let simpleComponent: ComponentDefinition;
let complexTypesComponents: ComponentDefinition[];

beforeAll(() => {
  const simpleResult = buildProject('simple');
  expect(simpleResult).toHaveLength(1);
  [simpleComponent] = simpleResult;

  complexTypesComponents = buildProject('complex-types');
  expect(complexTypesComponents.length).toBeGreaterThan(0);
});

test('object definition should handle basic types', () => {
  expect(simpleComponent.name).toBe('Simple');
  expect(simpleComponent.properties).toBeDefined();
});

test('object definition should handle union types correctly', () => {
  // Find a component with union types
  const componentWithUnions = complexTypesComponents.find(comp =>
    comp.properties.some(prop => prop.inlineType?.type === 'union')
  );

  if (componentWithUnions) {
    const unionProp = componentWithUnions.properties.find(def => def.inlineType?.type === 'union');

    if (unionProp?.inlineType?.type === 'union') {
      expect(unionProp.inlineType.values).toBeDefined();
      expect(Array.isArray(unionProp.inlineType.values)).toBe(true);
      expect(unionProp.inlineType.values.length).toBeGreaterThan(0);
    }
  }
});

test('object definition should handle string literal unions', () => {
  // Test string literal union handling
  const componentWithStringUnions = complexTypesComponents.find(comp =>
    comp.properties.some(prop => prop.inlineType?.type === 'union' && prop.type === 'string')
  );

  if (componentWithStringUnions) {
    const stringUnionProp = componentWithStringUnions.properties.find(
      prop => prop.inlineType?.type === 'union' && prop.type === 'string'
    );

    if (stringUnionProp?.inlineType?.type === 'union') {
      expect(stringUnionProp.type).toBe('string');
      expect(stringUnionProp.inlineType.values).toBeDefined();
      // Should contain string values
      expect(stringUnionProp.inlineType.values.some(v => typeof v === 'string')).toBe(true);
    }
  }
});

test('object definition should handle number literal unions', () => {
  // Test number literal union handling
  const componentWithNumberUnions = complexTypesComponents.find(comp =>
    comp.properties.some(prop => prop.inlineType?.type === 'union' && prop.type === 'number')
  );

  if (componentWithNumberUnions) {
    const numberUnionProp = componentWithNumberUnions.properties.find(
      prop => prop.inlineType?.type === 'union' && prop.type === 'number'
    );

    if (numberUnionProp?.inlineType?.type === 'union') {
      expect(numberUnionProp.type).toBe('number');
      expect(numberUnionProp.inlineType.values).toBeDefined();
    }
  }
});

test('object definition should preserve type information', () => {
  const props = simpleComponent.properties;
  expect(props.length).toBeGreaterThan(0);

  props.forEach(prop => {
    expect(prop.name).toBeDefined();
    expect(prop.type).toBeDefined();
  });
});

test('object definition should handle mixed union types', () => {
  // Test mixed union types (not primitive)
  const componentWithMixedUnions = complexTypesComponents.find(comp =>
    comp.properties.some(prop => prop.inlineType?.type === 'union' && prop.type !== 'string' && prop.type !== 'number')
  );

  if (componentWithMixedUnions) {
    const mixedUnionProp = componentWithMixedUnions.properties.find(
      prop => prop.inlineType?.type === 'union' && prop.type !== 'string' && prop.type !== 'number'
    );

    if (mixedUnionProp?.inlineType?.type === 'union') {
      expect(mixedUnionProp.inlineType.values).toBeDefined();
      expect(mixedUnionProp.inlineType.name).toBeDefined();
    }
  }
});

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('button-group');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('should have correct name, description and release status', () => {
  expect(component.name).toBe('ButtonGroup');
  expect(component.description).toBe('Component-level description');
  expect(component.releaseStatus).toBe('stable');
});

test('should have correct properties', () => {
  expect(component.properties).toEqual([
    {
      name: 'items',
      description: 'This is items array',
      type: 'ReadonlyArray<ButtonGroupProps.Item>',
      optional: false,
    },
    {
      name: 'variant',
      description: 'This is variant',
      type: 'ButtonGroupProps.Variant',
      inlineType: {
        name: 'string',
        type: 'union',
        values: ['icong'],
      },
      optional: false,
    },
  ]);
});

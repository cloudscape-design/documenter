// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('system-tag');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('should have correct region definitions', () => {
  expect(component.properties).toEqual([
    {
      name: 'color',
      description: 'Color',
      type: 'string',
      optional: true,
      systemTags: ['core'],
    },
    {
      name: 'fontFamily',
      description: 'Font family\nMore text',
      type: 'string',
      optional: true,
      systemTags: ['core', 'something'],
    },
    {
      name: 'variant',
      description: 'Variant',
      type: 'string',
      optional: true,
      inlineType: {
        name: 'ExampleProps.Variant',
        type: 'union',
        values: ['primary', 'secondary'],
      },
    },
  ]);
  expect(component.regions).toEqual([
    {
      name: 'children',
      description: 'Main content',
      isDefault: true,
    },
  ]);
});

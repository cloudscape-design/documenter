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
      inlineType: undefined,
      optional: true,
      systemTags: ['core'],
      defaultValue: undefined,
    },
    {
      name: 'fontFamily',
      description: 'Font family\nMore text',
      type: 'string',
      inlineType: undefined,
      optional: true,
      systemTags: ['core', 'something'],
      defaultValue: undefined,
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

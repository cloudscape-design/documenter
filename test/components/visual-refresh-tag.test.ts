// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('visual-refresh-tag');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('should have correct region definitions', () => {
  expect(component.properties).toEqual([
    {
      name: 'footer',
      type: 'string',
      inlineType: undefined,
      optional: true,
      description: 'Footer\nMore text',
      visualRefreshTag: '',
      defaultValue: undefined,
    },
    {
      name: 'header',
      type: 'string',
      inlineType: undefined,
      optional: true,
      description: 'Header',
      visualRefreshTag: '',
      defaultValue: undefined,
    },
  ]);
  expect(component.regions).toEqual([
    {
      name: 'children',
      displayName: 'content',
      description: 'Main content',
      visualRefreshTag: 'heavy font weight',
      isDefault: true,
    },
  ]);
});

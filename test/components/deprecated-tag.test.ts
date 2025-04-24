// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test, beforeAll } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('deprecated-tag');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('should have correct region and properties definitions', () => {
  expect(component.properties).toEqual([
    {
      defaultValue: undefined,
      deprecatedTag: 'Custom CSS is not supported.',
      description: 'Adds the specified classes to the root element of the component.',
      inlineType: undefined,
      name: 'className',
      optional: true,
      type: 'string',
      visualRefreshTag: undefined,
    },
    {
      defaultValue: undefined,
      deprecatedTag: undefined,
      description: 'Header',
      inlineType: undefined,
      name: 'header',
      optional: true,
      type: 'string',
      visualRefreshTag: undefined,
    },
  ]);
  expect(component.regions).toEqual([
    {
      deprecatedTag: 'This slot is not supported.',
      description: 'Main content',
      displayName: 'content',
      isDefault: true,
      name: 'children',
      visualRefreshTag: undefined,
    },
  ]);
  expect(component.events).toEqual([
    {
      deprecatedTag: 'This event handler is not supported.',
      description: 'Fired when the user clicks the button.',
      name: 'onButtonClick',
      cancelable: false,
      detailType: undefined,
      detailInlineType: undefined,
    },
  ]);
});

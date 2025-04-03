// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';
import { ComponentDefinition } from '../../src';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('portals');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('should detect component which uses createPortals', () => {
  expect(component.name).toEqual('SimplePortal');
});

test('should have correct properties', () => {
  expect(component.properties).toEqual([
    {
      name: 'count',
      description: 'Number example',
      type: 'number',
      optional: true,
      defaultValue: '123',
    },
    {
      name: 'enabled',
      description: 'Boolean example',
      type: 'boolean',
      optional: true,
      defaultValue: 'true',
    },
    {
      name: 'name',
      description: 'This is name\nMore text to have multi-line comment',
      type: 'string',
      optional: false,
      defaultValue: undefined,
    },
    {
      name: 'variant',
      description: 'This is variant',
      type: '"link" | "button"',
      inlineType: {
        name: '"link" | "button"',
        type: 'union',
        values: ['link', 'button'],
      },
      optional: true,
      defaultValue: "'button'",
    },
  ]);
});

test('should have correct events', () => {
  expect(component.events).toEqual([
    {
      name: 'onClick',
      description: 'Fired when user clicks',
      cancelable: true,
      detailType: undefined,
    },
    {
      name: 'onFollow',
      description: 'Fired when user clicks without modifier keys pressed',
      cancelable: false,
      detailType: undefined,
    },
  ]);
});

test('should have correct region definitions', () => {
  expect(component.regions).toEqual([
    {
      name: 'children',
      displayName: 'content',
      description: 'Portal content',
      isDefault: true,
    },
  ]);
});

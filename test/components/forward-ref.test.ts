// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';
import { ComponentDefinition } from '../../src';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('forward-ref');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('should detect component which uses forwardRef', () => {
  expect(component.name).toEqual('Focusable');
});

test('should detect default properties from forwardRef', () => {
  expect(component.properties).toEqual([
    {
      name: 'count',
      defaultValue: '123',
      optional: true,
      type: 'number',
    },
    {
      name: 'enabled',
      defaultValue: 'true',
      optional: true,
      type: 'boolean',
    },
    {
      name: 'type',
      defaultValue: "'text'",
      optional: true,
      type: 'string',
    },
  ]);
});

test('should provide correct function definition', () => {
  expect(component.functions).toEqual([
    {
      description: 'Focuses the primary element',
      name: 'focus',
      parameters: [],
      returnType: 'void',
    },
    {
      description: 'Focuses element using the CSS-selector',
      name: 'focusBySelector',
      parameters: [
        {
          name: 'selector',
          type: 'string',
        },
      ],
      returnType: 'void',
    },
  ]);
});

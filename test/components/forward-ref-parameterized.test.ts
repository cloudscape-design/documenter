// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';
import { ComponentDefinition } from '../../src';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('forward-ref-parameterized');
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
      name: 'items',
      optional: false,
      type: 'ReadonlyArray<T>',
    },
  ]);
});

test('should provide correct function definition', () => {
  expect(component.functions).toEqual([
    {
      description: 'Focuses the nth item in the component',
      name: 'focus',
      parameters: [
        {
          name: 'rowIndex',
          type: 'number',
        },
      ],
      returnType: 'void',
    },
  ]);
});

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';
import { ComponentDefinition } from '../../src';

let main: ComponentDefinition | undefined;
beforeAll(() => {
  const result = buildProject('import-types');
  expect(result.map(component => component.name)).toEqual(['Dependency', 'Main']);

  main = result.find(component => component.name === 'Main');
});

test('should resolve object type', () => {
  expect(main?.properties).toEqual([
    {
      name: 'variant',
      type: 'string',
      inlineType: {
        name: 'DependencyProps.Variant',
        type: 'union',
        values: ['link', 'button'],
      },
      optional: false,
      defaultValue: undefined,
      description: undefined,
    },
  ]);
});

test('should resolve event detail types', () => {
  expect(main?.events).toEqual([
    {
      name: 'onChange',
      cancelable: false,
      detailType: 'BaseChangeDetail',
      detailInlineType: {
        name: 'BaseChangeDetail',
        properties: [
          {
            name: 'value',
            type: 'string',
            optional: false,
          },
        ],
        type: 'object',
      },
    },
    {
      name: 'onKeyDown',
      cancelable: true,
      detailType: 'BaseKeyDetail',
      detailInlineType: {
        name: 'BaseKeyDetail',
        properties: [
          {
            name: 'key',
            optional: false,
            type: 'string',
          },
        ],
        type: 'object',
      },
    },
  ]);
});

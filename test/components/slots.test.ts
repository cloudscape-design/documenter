// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test, beforeAll } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('slots');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('should have correct region definitions', () => {
  expect(component.properties).toEqual([
    {
      name: 'media',
      description: 'Media content',
      optional: true,
      type: '{ content: React.ReactNode; }',
      inlineType: {
        name: '{ content: React.ReactNode; }',
        properties: [
          {
            name: 'content',
            optional: true,
            type: 'React.ReactNode',
          },
        ],
        type: 'object',
      },
    },
  ]);
  expect(component.regions).toEqual([
    {
      name: 'children',
      displayName: 'content',
      description: 'Main content',
      isDefault: true,
    },
    {
      name: 'header',
      description: 'Header',
      isDefault: false,
    },
  ]);
});

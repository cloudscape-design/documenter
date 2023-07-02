// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('exact-optional-property-types');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('should have correct properties', () => {
  expect(component.properties).toEqual([
    {
      name: 'children',
      description: 'String example',
      type: 'string',
      optional: false,
      defaultValue: undefined,
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
  ]);
});

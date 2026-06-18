// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test, beforeAll } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('is-children-default-tag');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('children region opts out of the default slot with @isChildrenDefault false', () => {
  expect(component.regions).toEqual([
    {
      name: 'children',
      displayName: 'content',
      description: 'Main content',
      isDefault: false,
      deprecatedTag: undefined,
      visualRefreshTag: undefined,
    },
  ]);
});

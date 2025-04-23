// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test, beforeAll } from 'vitest';
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

describe('Analytics tag', () => {
  let component: ComponentDefinition;
  beforeAll(() => {
    const result = buildProject('analytics-tag');
    expect(result).toHaveLength(1);

    component = result[0];
  });

  test('should have correct properties definitions', () => {
    expect(component.properties).toEqual([
      {
        name: 'analyticsMetadata',
        analyticsTag: 'View details in Analytics tab',
        optional: true,
        type: 'string',
      },
    ]);
  });

  test('should have correct regions definitions', () => {
    expect(component.regions).toEqual([
      {
        name: 'children',
        isDefault: true,
      },
    ]);
  });
});

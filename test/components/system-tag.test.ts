// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentDefinition } from '../../src/components/interfaces';
import { buildProject } from './test-helpers';

describe('System tag', () => {
  let button: ComponentDefinition;
  let tree: ComponentDefinition;
  beforeAll(() => {
    const result = buildProject('system-tag');
    expect(result).toHaveLength(2);

    [button, tree] = result;
  });

  test('should annotate whole components', () => {
    expect(button.systemTag).toBeUndefined();
    expect(tree.systemTag).toEqual(['core']);
  });

  test('should annotate individual properties', () => {
    expect(button.properties).toEqual([
      {
        name: 'color',
        type: 'string',
        optional: true,
        inlineType: {
          name: '"normal" | "danger"',
          type: 'union',
          valueDescriptions: { danger: { systemTag: ['core'] } },
          values: ['normal', 'danger'],
        },
      },
      {
        name: 'size',
        type: 'string',
        optional: false,
        systemTag: ['core'],
        inlineType: {
          name: '"small" | "medium" | "large"',
          type: 'union',
          values: ['small', 'medium', 'large'],
        },
      },
      {
        name: 'variant',
        type: 'string',
        optional: true,
        inlineType: {
          name: 'ButtonProps.Variant',
          type: 'union',
          valueDescriptions: {
            fire: { systemTag: ['core'] },
            ultra: { systemTag: ['core', 'experimental'] },
          },
          values: ['primary', 'secondary', 'fire', 'ultra'],
        },
      },
    ]);
  });
});

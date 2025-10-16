// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, test } from 'vitest';
import { buildProject } from './test-helpers';

describe('Error boundary', () => {
  test('should have correct properties definitions', () => {
    const result = buildProject('error-boundary');
    expect(result).toMatchSnapshot();
  });
});

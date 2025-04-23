// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from 'vitest';
import { buildProject } from './test-helpers';

test('should ignore custom exports, if specified', () => {
  const result = buildProject('custom-exports', {
    extraExports: {
      Button: ['InternalButton'],
    },
  });
  expect(result).toHaveLength(1);
});

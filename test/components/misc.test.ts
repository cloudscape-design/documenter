// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from 'vitest';
import { buildProject } from './test-helpers';

test('should only expose components exported from the default file', () => {
  const result = buildProject('with-internals');
  expect(result.map(component => component.name)).toEqual(['WithInternals']);
});

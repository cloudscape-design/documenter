// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { expect, test } from 'vitest';
import { buildProject } from './test-helpers';

test('should not expand highcharts types', () => {
  const result = buildProject('highcharts');
  expect(result).toMatchSnapshot();
});

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentDefinition } from '../../src';
import { buildProject } from './test-helpers';

let component: ComponentDefinition;
beforeAll(() => {
  const result = buildProject('release-status');
  expect(result).toHaveLength(1);

  component = result[0];
});

test('should have beta release status & version', () => {
  expect(component.releaseStatus).toBe('beta');
  expect(component.version).toBe('1.0-beta');
});

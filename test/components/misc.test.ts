// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { buildProject } from './test-helpers';

it('should only expose components exported from the default file', () => {
  const result = buildProject('with-internals');
  expect(result.map(component => component.name)).toEqual(['WithInternals']);
});

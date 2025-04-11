// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { documentComponents } from '../../src';

test('legacy API works', () => {
  const definitions = documentComponents(
    require.resolve(`../../fixtures/components/simple/tsconfig.json`),
    `fixtures/components/simple/*/index.tsx`
  );
  expect(definitions).toHaveLength(1);
});

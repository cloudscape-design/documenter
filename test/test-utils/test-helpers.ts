// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { documentTestUtils } from '../../src/test-utils';
import { TestUtilsDoc } from '../../src/test-utils/interfaces';

export function buildTestUtilsProject(name: string, testGlob?: string): TestUtilsDoc[] {
  return documentTestUtils(
    {
      tsconfig: require.resolve(`../../fixtures/test-utils/${name}/tsconfig.json`),
    },
    testGlob || `fixtures/test-utils/${name}/**/*`
  );
}

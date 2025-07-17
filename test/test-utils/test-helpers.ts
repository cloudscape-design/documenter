// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { documentTestUtilsNew, TestUtilsDocumenterOptions } from '../../src/test-utils-new';
import { TestUtilsDoc } from '../../src/test-utils/interfaces';

export function buildTestUtilsProject(
  name: string,
  configOverrides?: Partial<TestUtilsDocumenterOptions>
): TestUtilsDoc[] {
  return documentTestUtilsNew({
    tsconfigPath: require.resolve(`../../fixtures/test-utils/${name}/tsconfig.json`),
    domUtilsRoot: `fixtures/test-utils/${name}/index.ts`,
    selectorsUtilsRoot: `fixtures/test-utils/${name}/index.ts`,
    ...configOverrides,
  }).domDefinitions;
}

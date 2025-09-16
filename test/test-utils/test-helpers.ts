// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { documentTestUtilsNew, TestUtilsVariantOptions } from '../../src/test-utils';
import { TestUtilsDoc } from '../../src/test-utils/interfaces';

export function buildTestUtilsProject(
  name: string,
  configOverrides?: Partial<TestUtilsVariantOptions>
): TestUtilsDoc[] {
  return documentTestUtilsNew({
    tsconfigPath: require.resolve(`../../fixtures/test-utils/${name}/tsconfig.json`),
    domUtils: { root: `fixtures/test-utils/${name}/index.ts`, ...configOverrides },
    selectorsUtils: { root: `fixtures/test-utils/${name}/index.ts`, ...configOverrides },
  }).domDefinitions;
}

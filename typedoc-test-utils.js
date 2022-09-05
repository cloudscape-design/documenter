// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  $schema: 'https://typedoc.org/schema.json',
  githubPages: false,
  plugin: './plugins/typedoc-plugin-test-utils/lib',
  tsconfig: 'fixtures/test-utils/tsconfig.json',
  entryPoints: ['fixtures/test-utils/dom/index.ts', 'fixtures/test-utils/selectors/index.ts'],
  out: 'docs/test-utils',
};

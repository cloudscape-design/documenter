// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  $schema: 'https://typedoc.org/schema.json',
  githubPages: false,
  plugin: './typedoc-plugin-test-utils/lib',
  tsconfig: 'fixtures-2.0/test-utils/tsconfig.json',
  entryPoints: ['fixtures-2.0/test-utils/dom/index.ts', 'fixtures-2.0/test-utils/selectors/index.ts'],
  out: 'docs/test-utils',
};

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  $schema: 'https://typedoc.org/schema.json',
  githubPages: false,
  plugin: './typedoc-plugin-collection-hooks/lib',
  tsconfig: 'fixtures-2.0/collection-hooks/tsconfig.json',
  entryPoints: ['fixtures-2.0/collection-hooks/src/index.ts', 'fixtures-2.0/collection-hooks/src/operations.ts'],
  out: 'docs/collection-hooks',
};

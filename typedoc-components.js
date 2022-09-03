// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  $schema: 'https://typedoc.org/schema.json',
  githubPages: false,
  plugin: './typedoc-plugin-components/lib',
  tsconfig: 'fixtures-2.0/components/tsconfig.json',
  entryPoints: ['fixtures-2.0/components/src/index.ts'],
  out: 'docs/components',
};

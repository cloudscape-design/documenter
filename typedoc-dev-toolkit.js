// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  $schema: 'https://typedoc.org/schema.json',
  githubPages: false,
  plugin: './typedoc-plugin-dev-toolkit/lib',
  tsconfig: 'fixtures-2.0/dev-toolkit/tsconfig.json',
  entryPoints: ['fixtures-2.0/dev-toolkit/src/index.ts', 'fixtures-2.0/dev-toolkit/src/dom/index.ts'],
  out: 'docs/dev-toolkit',
};

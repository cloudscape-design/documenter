// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  $schema: 'https://typedoc.org/schema.json',
  githubPages: false,
  plugin: './plugins/typedoc-plugin-component-toolkit/lib',
  tsconfig: 'fixtures/component-toolkit/tsconfig.json',
  entryPoints: ['fixtures/component-toolkit/src/index.ts', 'fixtures/component-toolkit/src/dom/index.ts'],
  out: 'docs/component-toolkit',
};

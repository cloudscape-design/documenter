// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path';
import { execa } from 'execa';
import { globbySync } from 'globby';
import commandLineArgs from 'command-line-args';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const cliOptions = commandLineArgs([
  { name: 'src', type: String, defaultOption: true, defaultValue: '*' },
  { name: 'exclude', alias: 'e', type: String, defaultValue: '' },
]);

const includedConfigs = globbySync(`typedoc-*${cliOptions.src}*.js`);
const excludedConfigs = cliOptions.exclude ? globbySync(`typedoc-*${cliOptions.exclude}*.js`) : [];
const configs = includedConfigs.filter(c => !excludedConfigs.includes(c));

// Build typedoc-plugin.
await execa('tsc', ['-p', 'plugins/typedoc-plugin/tsconfig.json'], { stdio: 'inherit' });

// Build included plugins.
for (const configFile of configs) {
  const config = require(path.resolve(configFile));
  await execa('tsc', ['-p', config.plugin.replace(/lib$/, 'tsconfig.json')], { stdio: 'inherit' });
}

// Generate docs from fixtures.
for (const configFile of configs) {
  execa('typedoc', ['--options', configFile], { stdio: 'inherit' });
}

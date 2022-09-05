// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { execa } from 'execa';
import { globbySync } from 'globby';

const [basePlugin, ...restPlugins] = globbySync('plugins/**/tsconfig.json');

async function compile() {
  await execa('tsc', ['-p', basePlugin], { stdio: 'inherit' });
  restPlugins.forEach(plugin => execa('tsc', ['-p', plugin], { stdio: 'inherit' }));
}

compile();

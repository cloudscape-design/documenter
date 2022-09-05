// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { execa } from 'execa';
import { globbySync } from 'globby';
import commandLineArgs from 'command-line-args';

const cliOptions = commandLineArgs([{ name: 'src', type: String, defaultOption: true, defaultValue: '*' }]);

const configs = globbySync(`./typedoc-*${cliOptions.src}*.js`);

configs.forEach(configFile => execa('typedoc', ['--options', configFile], { stdio: 'inherit' }));

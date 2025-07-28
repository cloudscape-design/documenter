// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import pathe from 'pathe';
import { getTemporaryDir } from '../components/test-helpers';
// must use compiled artifacts, because the code relies on generated files
import { writeTestUtilsDocumentation } from '../../lib';

test('should write documentation files into the outDir', async () => {
  const outDir = getTemporaryDir();
  expect(fs.readdirSync(outDir)).toHaveLength(0);

  writeTestUtilsDocumentation({
    tsconfigPath: pathe.resolve('fixtures/test-utils/simple/tsconfig.json'),
    domUtils: { root: 'fixtures/test-utils/simple/index.ts' },
    selectorsUtils: { root: 'fixtures/test-utils/simple/index.ts' },
    outDir,
  });

  expect(fs.readdirSync(outDir)).toEqual(['dom.d.ts', 'dom.js', 'interfaces.d.ts', 'selectors.d.ts', 'selectors.js']);
  const { default: domDefinitions } = await import(pathe.join(outDir, 'dom.js'));
  expect(domDefinitions).toEqual({
    classes: [expect.objectContaining({ name: 'TestUtilWrapper' })],
  });
  const { default: selectorsDefinitions } = await import(pathe.join(outDir, 'selectors.js'));
  expect(selectorsDefinitions).toEqual({
    classes: [expect.objectContaining({ name: 'TestUtilWrapper' })],
  });
  expect(() => execSync('tsc dom.d.ts selectors.d.ts', { cwd: outDir, stdio: 'inherit' })).not.toThrow();
});

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect, test } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import pathe from 'pathe';
import { getTemporaryDir } from './test-helpers';
// must use compiled artifacts, because the code relies on generated files
import { writeComponentsDocumentation } from '../../lib';

test('should write documentation files into the outDir', async () => {
  const outDir = getTemporaryDir();
  expect(fs.readdirSync(outDir)).toHaveLength(0);

  writeComponentsDocumentation({
    tsconfigPath: pathe.resolve('fixtures/components/simple/tsconfig.json'),
    publicFilesGlob: 'fixtures/components/simple/*/index.tsx',
    outDir,
  });

  expect(fs.readdirSync(outDir)).toEqual(['index.d.ts', 'index.js', 'interfaces.d.ts', 'simple.js']);
  const { default: definitions } = await import(pathe.join(outDir, 'index.js'));
  expect(definitions).toEqual({
    simple: expect.objectContaining({ name: 'Simple', dashCaseName: 'simple' }),
  });
  expect(() => execSync('tsc index.d.ts', { cwd: outDir, stdio: 'inherit' })).not.toThrow();
});

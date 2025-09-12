// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import os from 'node:os';
import pathe from 'pathe';
import ts from 'typescript';
import { documentComponents, DocumenterOptions } from '../../src/components';

export function buildProject(name: string, options?: Partial<DocumenterOptions>) {
  return documentComponents({
    tsconfigPath: pathe.resolve(`fixtures/components/${name}/tsconfig.json`),
    publicFilesGlob: `fixtures/components/${name}/*/index.tsx`,
    ...options,
  });
}

export function getTemporaryDir() {
  return fs.mkdtempSync(pathe.join(os.tmpdir(), 'documenter-'));
}

export function getInMemoryProject(source: string) {
  const host = ts.createCompilerHost({});
  const mockFs = new Map<string, string>([['temp.ts', source]]);
  // mock file system access
  host.readFile = name => mockFs.get(name);
  host.writeFile = () => {};
  const program = ts.createProgram(['temp.ts'], {}, host);
  const checker = program.getTypeChecker();
  const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile('temp.ts')!)!;
  const exportSymbol = checker.getExportsOfModule(moduleSymbol)[0];

  return { exportSymbol, checker };
}

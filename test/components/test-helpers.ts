// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ProjectReflection } from 'typedoc';
import { ComponentDefinition, documentComponents, documentTestUtils } from '../../src';
import { bootstrapProject } from '../../src/bootstrap';
import { TestUtilsDoc } from '../../src/test-utils/interfaces';
import ts from 'typescript';

export function buildProject(name: string): ComponentDefinition[] {
  return documentComponents(
    require.resolve(`../../fixtures/components/${name}/tsconfig.json`),
    `fixtures/components/${name}/*/index.tsx`
  );
}

export function buildTestUtilsProject(name: string, testGlob?: string): TestUtilsDoc[] {
  return documentTestUtils(
    {
      tsconfig: require.resolve(`../../fixtures/test-utils/${name}/tsconfig.json`),
    },
    testGlob || `fixtures/test-utils/${name}/**/*`
  );
}

export function buildCustomProject(tsConfig: string, testGlob: string): ProjectReflection {
  const project = bootstrapProject(
    {
      tsconfig: require.resolve(tsConfig),
    },
    testGlob
  );
  return project;
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

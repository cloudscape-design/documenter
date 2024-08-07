// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ProjectReflection } from 'typedoc';
import { ComponentDefinition, documentComponents, documentTestUtils } from '../../src';
import { bootstrapProject } from '../../src/bootstrap';
import { TestUtilsDoc } from '../../src/test-utils/interfaces';

// TODO: Move this file into common location, improve naming

export function buildProject(name: string, nodeModulesInputFilePaths?: string[]): ComponentDefinition[] {
  return documentComponents(
    require.resolve(`../../fixtures/components/${name}/tsconfig.json`),
    `fixtures/components/${name}/*/index.tsx`,
    nodeModulesInputFilePaths
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

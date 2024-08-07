// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ComponentDefinition } from './interfaces';
import extractComponents from './components-extractor';
import { bootstrapProject } from '../bootstrap';

export function documentComponents(
  tsconfigPath: string,
  publicFilesGlob: string,
  nodeModulesInputFilePaths?: string[]
): ComponentDefinition[] {
  const includeNodeModulePaths = Boolean(nodeModulesInputFilePaths?.length);
  const project = bootstrapProject(
    {
      tsconfig: tsconfigPath,
      includeDeclarations: includeNodeModulePaths,
      excludeExternals: includeNodeModulePaths,
    },
    undefined,
    nodeModulesInputFilePaths
  );
  return extractComponents(publicFilesGlob, project);
}

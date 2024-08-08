// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ComponentDefinition } from './interfaces';
import extractComponents from './components-extractor';
import { bootstrapProject } from '../bootstrap';

/**
 * @param tsconfigPath Path to tsconfig file
 * @param publicFilesGlob Filter to obtain public files
 * @param nodeModulesDependencyFilePaths node_modules paths of libraries to include in documentation e.g.["dir/node_modules/@cloudscape-design/components/icon/interfaces.d.ts"]
 * @returns Component definitions
 */
export function documentComponents(
  tsconfigPath: string,
  publicFilesGlob: string,
  nodeModulesDependencyFilePaths?: string[]
): ComponentDefinition[] {
  const includeNodeModulePaths = Boolean(nodeModulesDependencyFilePaths?.length);
  const project = bootstrapProject(
    {
      tsconfig: tsconfigPath,
      includeDeclarations: includeNodeModulePaths,
      excludeExternals: includeNodeModulePaths,
    },
    undefined,
    nodeModulesDependencyFilePaths
  );
  return extractComponents(publicFilesGlob, project);
}

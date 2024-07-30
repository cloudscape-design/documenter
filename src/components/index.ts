// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ComponentDefinition } from './interfaces';
import extractComponents from './components-extractor';
import { bootstrapProject } from '../bootstrap';

export function documentComponents(
  tsconfigPath: string,
  publicFilesGlob: string,
  hasCoreComponentTypeDependency?: boolean
): ComponentDefinition[] {
  const project = bootstrapProject({
    tsconfig: tsconfigPath,
    includeDeclarations: hasCoreComponentTypeDependency,
  });
  return extractComponents(publicFilesGlob, project, hasCoreComponentTypeDependency);
}

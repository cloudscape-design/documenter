// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ComponentDefinition } from './interfaces';
import extractComponents from './components-extractor';
import { bootstrapProject } from '../bootstrap';

export function documentComponents(tsconfigPath: string, publicFilesGlob: string): ComponentDefinition[] {
  const project = bootstrapProject({ tsconfig: tsconfigPath }, publicFilesGlob);
  return extractComponents(publicFilesGlob, project);
}

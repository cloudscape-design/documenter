// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { TypeDocAndTSOptions, Application, TSConfigReader, ProjectReflection } from 'typedoc';
import { matcher } from 'micromatch';
import { resolve } from 'pathe';

export function bootstrapProject(options: Partial<TypeDocAndTSOptions>, filteringGlob?: string): ProjectReflection {
  const app = new Application();
  app.options.addReader(new TSConfigReader());

  const { inputFiles, hasErrors } = app.bootstrap(options);
  if (hasErrors) {
    throw new Error('Errors during parsing configuration');
  }

  const filteredInputFiles = filterFiles(inputFiles, filteringGlob);
  if (!filteredInputFiles.length) {
    throw new Error('No input files to convert');
  }

  const project = app.convert(filteredInputFiles);
  if (!project) {
    throw new Error('Project generation failed');
  }

  return project;
}

function filterFiles(inputFiles: string[], filteringGlob?: string): string[] {
  if (!filteringGlob) {
    return inputFiles;
  }
  const isMatch = matcher(resolve(filteringGlob));
  return inputFiles.filter(file => isMatch(file));
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { TypeDocOptions, Application, TSConfigReader, ProjectReflection, OptionsReader, Options } from 'typedoc';
import glob from 'glob';

export class ArgumentsReader implements OptionsReader {
  name = 'files';
  priority = 0;

  constructor(private filesGlob: string) {}

  read(container: Options): void {
    const entries = glob.sync(this.filesGlob);
    container.setValue('entryPoints', entries);
  }
}

export function bootstrapProject(options: Partial<TypeDocOptions>, entriesGlob: string): ProjectReflection {
  const app = new Application();
  app.options.addReader(new TSConfigReader());
  app.options.addReader(new ArgumentsReader(entriesGlob));

  app.bootstrap(options);

  const project = app.convert();
  if (!project) {
    throw new Error('Project generation failed');
  }

  return project;
}

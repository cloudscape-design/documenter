// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DeclarationReflection, ProjectReflection, Reflection, UrlMapping } from 'typedoc';
import CloudscapeTheme from '../../../typedoc-plugin/lib/theme';
import RenderContext from './render-context';

export default class extends CloudscapeTheme {
  context = new RenderContext();

  // Maps the models of the given project to the desired output files.
  getUrls(project: ProjectReflection): UrlMapping[] {
    const urls: UrlMapping[] = [];

    project.children?.forEach((declaration: Reflection) => {
      if (declaration instanceof DeclarationReflection) {
        if (declaration.name.endsWith('Props')) {
          declaration.name = declaration.name.slice(0, -'Props'.length);
        }

        this.buildUrls(declaration, urls);
      }
    });

    return urls;
  }
}

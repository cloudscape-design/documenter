// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DeclarationReflection, ProjectReflection, Reflection, UrlMapping } from 'typedoc';
import CloudscapeTheme from '../../../typedoc-plugin/lib/theme';

export default class extends CloudscapeTheme {
  // Maps the models of the given project to the desired output files.
  getUrls(project: ProjectReflection): UrlMapping[] {
    const urls: UrlMapping[] = [];

    for (const namespace of getChildDeclarations(project)) {
      for (const declaration of getChildDeclarations(namespace)) {
        // Prefix non-index declaration names with namespace name.
        if (namespace.name !== 'index') {
          declaration.name = `${namespace.name}/${declaration.name}`;
        }
        this.buildUrls(declaration, urls);
      }
    }

    return urls;
  }

  getUrl(reflection: Reflection): string {
    return reflection.getAlias();
  }
}

function getChildDeclarations(reflection: ProjectReflection | DeclarationReflection): DeclarationReflection[] {
  const children: DeclarationReflection[] = [];
  reflection.children?.forEach((child: Reflection) => {
    if (child instanceof DeclarationReflection) {
      children.push(child);
    }
  });
  return children;
}
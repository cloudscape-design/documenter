// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Theme, PageEvent, Reflection, UrlMapping, ProjectReflection, DeclarationReflection } from 'typedoc';
import { LayoutNode } from './layout';
import RenderContext, { IRenderContext } from './render-context';

export abstract class AbstractCloudscapeTheme<T> extends Theme {
  protected abstract context: IRenderContext<T>;
  protected template = (props: PageEvent<DeclarationReflection>): null | T => this.context.member(props.model);

  // Maps the models of the given project to the desired output files.
  getUrls(project: ProjectReflection): UrlMapping[] {
    const urls: UrlMapping[] = [];

    project.children?.forEach((declaration: Reflection) => {
      if (declaration instanceof DeclarationReflection) {
        this.buildUrls(declaration, urls);
      }
    });

    return urls;
  }

  // Builds the url for the the given reflection and all of its children.
  buildUrls(reflection: DeclarationReflection, urls: UrlMapping[]): UrlMapping[] {
    if (!reflection.url) {
      const url = this.getUrl(reflection);
      urls.push(new UrlMapping(url, reflection, this.template as any));
      reflection.url = url;
      reflection.hasOwnDocument = true;
    }
    return urls;
  }

  getUrl(reflection: Reflection, relative?: Reflection, separator = '.'): string {
    const reflectionUrl =
      reflection.parent && reflection.parent !== relative && !(reflection.parent instanceof ProjectReflection)
        ? this.getUrl(reflection.parent, relative, separator) + separator + this.getReflectionAlias(reflection)
        : this.getReflectionAlias(reflection);
    return ['nodes', reflection.kindString ?? 'Unknown', reflectionUrl + '.json'].join('/');
  }

  getReflectionAlias(reflection: Reflection): string {
    return reflection.getAlias().replace(/-\d$/, '');
  }

  // Renders generated output.
  render(page: PageEvent<Reflection>): string {
    const output = page.template(page) as any;
    return JSON.stringify(output, null, 2);
  }
}

export class CloudscapeTheme extends AbstractCloudscapeTheme<LayoutNode> {
  protected context = new RenderContext();
}

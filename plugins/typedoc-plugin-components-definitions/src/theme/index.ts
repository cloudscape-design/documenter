// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Reflection } from 'typedoc';
import { AbstractCloudscapeTheme } from '../../../typedoc-plugin/lib/theme';
import { DefinitionNode } from './definition';
import RenderContext from './render-context';

export default class extends AbstractCloudscapeTheme<DefinitionNode> {
  context = new RenderContext();

  getUrl(reflection: Reflection): string {
    return ['definitions', reflection.kindString ?? 'Unknown', this.getReflectionAlias(reflection) + '.json'].join('/');
  }

  getReflectionAlias(reflection: Reflection): string {
    return super.getReflectionAlias(reflection).replace(/Props$/, '');
  }
}

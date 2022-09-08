// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Reflection } from 'typedoc';
import CloudscapeTheme from '../../../typedoc-plugin/lib/theme';
import RenderContext from './render-context';

export default class extends CloudscapeTheme {
  context = new RenderContext();

  getReflectionAlias(reflection: Reflection): string {
    return super.getReflectionAlias(reflection).replace(/Props$/, '');
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Application } from 'typedoc22';

import ToolkitTheme from './theme';
import { load as extend } from '../../typedoc-plugin/lib';

export function load(app: Application): void {
  extend(app, ToolkitTheme);
}

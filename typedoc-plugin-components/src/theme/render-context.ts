// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import CloudscapeRenderContext from '../../../typedoc-plugin/lib/theme/render-context';
import { member } from './partials';

// The context enables granular overrides of its members.
export default class RenderContext extends CloudscapeRenderContext {
  constructor() {
    super();
    this.member = member.bind(null, this);
  }
}

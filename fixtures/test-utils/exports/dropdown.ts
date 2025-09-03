// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ElementWrapper } from './core';
import OptionWrapper from './internal/option';

export class DropdownWrapper extends ElementWrapper {
  findItems(): Array<OptionWrapper> {
    return [];
  }

  findHighlightedOption() {
    return new OptionWrapper();
  }

  // test for circular dependency
  findItemGroup() {
    return new DropdownWrapper();
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ElementWrapper } from './core';

export class DropdownWrapper extends ElementWrapper {
  findItems(): Array<ElementWrapper> {
    return [];
  }

  // test for circular dependency
  findItemGroup() {
    return new DropdownWrapper();
  }
}

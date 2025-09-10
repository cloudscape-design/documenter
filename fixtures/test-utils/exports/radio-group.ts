// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ElementWrapper, MultiElementWrapper } from './core';

class RadioButtonWrapper extends ElementWrapper {
  findLabel() {
    return new ElementWrapper();
  }
}

export class RadioGroupWrapper extends ElementWrapper {
  findItems() {
    return new MultiElementWrapper<RadioButtonWrapper>();
  }
}

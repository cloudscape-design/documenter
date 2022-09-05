// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import AbstractSwitchWrapper from '../internal/abstract-switch';
export default class RadioButtonWrapper extends ElementWrapper {
  private findAbstractSwitch() {
    return new AbstractSwitchWrapper(this.getElement());
  }

  findLabel() {
    return this.findAbstractSwitch().findLabel();
  }

  findNativeInput() {
    return this.findAbstractSwitch().findNativeInput();
  }

  findDescription() {
    return this.findAbstractSwitch().findDescription();
  }
}

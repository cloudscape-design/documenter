// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper, ComponentWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
import AbstractSwitchWrapper from '../internal/abstract-switch';
export default class CheckboxWrapper extends ComponentWrapper {
  static rootSelector = styles.root;

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

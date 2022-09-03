// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper, ComponentWrapper } from '@cloudscape-design/test-utils-core/selectors';
const selectors: any = {};
import OptionWrapper from '../internal/option';
export default class TokenWrapper extends ComponentWrapper {
  static rootSelector: string = selectors.token;

  findOption() {
    return this.findComponent(`.${OptionWrapper.rootSelector}`, OptionWrapper)!;
  }

  findLabel() {
    return this.findOption().findLabel();
  }

  findDismiss() {
    return this.findByClassName(selectors['dismiss-button'])!;
  }
}

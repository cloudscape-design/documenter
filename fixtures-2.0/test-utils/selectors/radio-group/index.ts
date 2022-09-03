// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import { escapeSelector } from '@cloudscape-design/test-utils-core/utils';
import RadioButtonWrapper from './radio-button';
const styles: any = {};
export default class RadioGroupWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findButtons() {
    return this.findAllByClassName(styles.radio).map(r => new RadioButtonWrapper(r.getElement()));
  }

  findInputByValue(value: string) {
    const safeValue = escapeSelector(value);
    return this.find(`input[value="${safeValue}"]`);
  }
}

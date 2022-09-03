// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
const spinnerStyles: any = {};
export default class ButtonWrapper extends ComponentWrapper {
  static rootSelector: string = styles.button;

  findLoadingIndicator() {
    return this.find(`.${styles['icon-left']}.${spinnerStyles.root}`);
  }

  findTextRegion() {
    return this.find(`.${styles.content}`);
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper, usesDom } from '@cloudscape-design/test-utils-core/dom';

const styles: any = {};
const spinnerStyles: any = {};

export default class ButtonWrapper extends ComponentWrapper<HTMLButtonElement> {
  static rootSelector: string = styles.button;

  findLoadingIndicator(): ElementWrapper | null {
    return this.find(`.${styles['icon-left']}.${spinnerStyles.root}`);
  }

  findTextRegion(): ElementWrapper | null {
    return this.find(`.${styles.content}`);
  }

  @usesDom
  isDisabled(): boolean {
    if (this.element.tagName === 'A') {
      return this.element.getAttribute('aria-disabled') === 'true';
    } else {
      return this.element.disabled;
    }
  }
}

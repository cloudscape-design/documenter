// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
import ButtonWrapper from '../button';
export default class FlashWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;
  /**
   * Returns the dismiss button.
   *
   * The dismiss button is only rendered when the `dismissible` property is set to `true`.
   */

  findDismissButton() {
    return this.findComponent(`.${styles['dismiss-button']}`, ButtonWrapper);
  }
  /**
   * Returns the action slot.
   */

  findAction() {
    return this.findByClassName(styles['action-button-wrapper']);
  }
  /**
   * Returns the action button.
   *
   * The action button is only rendered when the `buttonText` property is set.
   */

  findActionButton() {
    return this.findComponent(`.${styles['action-button']}`, ButtonWrapper);
  }

  findHeader() {
    return this.findByClassName(styles['flash-header']);
  }

  findContent() {
    return this.findByClassName(styles['flash-content']);
  }
}

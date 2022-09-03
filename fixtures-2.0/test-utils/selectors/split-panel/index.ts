// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import ButtonWrapper from '../button';
const styles: any = {};
export default class SplitPanelWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findPreferencesButton() {
    return this.findComponent(`.${styles['preferences-button']}`, ButtonWrapper);
  }

  findCloseButton() {
    return this.findComponent(`.${styles['close-button']}`, ButtonWrapper);
  }

  findOpenButton() {
    return this.findComponent(`.${styles['open-button']}`, ButtonWrapper);
  }

  findSlider() {
    return this.findByClassName(styles.slider);
  }
  /**
   * Returns the same panel if it's currently open in bottom position. If not, it returns null.
   * Use this method to assert the panel position.
   */

  findOpenPanelBottom() {
    return this.matches(`.${styles['position-bottom']}:not(.${styles['drawer-closed']})`);
  }
  /**
   * Returns the same panel if it's currently open in side position. If not, it returns null.
   * Use this method to assert the panel position.
   */

  findOpenPanelSide() {
    return this.matches(`.${styles['position-side']}:not(.${styles['drawer-closed']})`);
  }
}

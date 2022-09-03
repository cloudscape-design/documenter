// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
import FlashWrapper from './flash';
export default class FlashbarWrapper extends ComponentWrapper {
  static rootSelector: string = styles.flashbar;
  /**
   * Returns the individual flashes of this flashbar.
   */

  findItems() {
    return this.findAllByClassName(styles.flash).map(item => new FlashWrapper(item.getElement()));
  }
}

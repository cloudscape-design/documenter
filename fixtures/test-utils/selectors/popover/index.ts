// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
import createWrapper, { ButtonWrapper } from '../index.js';
export default class PopoverWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findTrigger() {
    return this.findByClassName(styles.trigger)!;
  }
  /**
   * @param options
   * * renderWithPortal (boolean) - Flag to find the header when the popover is rendered with a portal
   */

  findHeader(
    options = {
      renderWithPortal: false,
    }
  ) {
    if (options.renderWithPortal) {
      return createWrapper().findByClassName(styles.header);
    }

    return this.findByClassName(styles.header);
  }
  /**
   * @param options
   * * renderWithPortal (boolean) - Flag to find the content when the popover is rendered with a portal
   */

  findContent(
    options = {
      renderWithPortal: false,
    }
  ) {
    if (options.renderWithPortal) {
      return createWrapper().findByClassName(styles.content);
    }

    return this.findByClassName(styles.content);
  }
  /**
   * @param options
   * * renderWithPortal (boolean) - Flag to find the dismiss button when the popover is rendered with a portal
   */

  findDismissButton(
    options = {
      renderWithPortal: false,
    }
  ) {
    if (options.renderWithPortal) {
      return createWrapper().findComponent(`.${styles['dismiss-control']}`, ButtonWrapper);
    }

    return this.findComponent(`.${styles['dismiss-control']}`, ButtonWrapper);
  }
}

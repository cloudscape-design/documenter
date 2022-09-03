// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class PaginationWrapper extends ComponentWrapper {
  static rootSelector = styles.root;

  findCurrentPage() {
    return this.findByClassName(styles['button-current'])!;
  }

  findPageNumbers() {
    return this.findAllByClassName(styles['page-number']);
  }
  /**
   * Returns a page number for a given index.
   *
   * @param index 1-based index of the page number to return.
   */

  findPageNumberByIndex(index: number) {
    // we need to skip the "previous page" button
    const pageIndex = index + 1;
    return this.find(`li:nth-child(${pageIndex}) .${styles.button}`);
  }

  findPreviousPageButton() {
    return this.find(`li:first-child .${styles.button}`)!;
  }

  findNextPageButton() {
    return this.find(`li:last-child .${styles.button}`)!;
  }
}

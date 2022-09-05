// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class GridWrapper extends ComponentWrapper {
  static rootSelector: string = styles.grid;
  /**
   * Returns a column from the grid for a given index.
   * @param columnIndex 1-based index of the column to return.
   */

  findColumn(columnIndex: number) {
    return this.find(`.${styles['grid-column']}:nth-child(${columnIndex}) > div`);
  }
}

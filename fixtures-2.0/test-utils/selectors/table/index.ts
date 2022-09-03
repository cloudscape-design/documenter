// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
const headerCellStyles: any = {};
const selectionStyles: any = {};
const resizerStyles: any = {};
import CollectionPreferencesWrapper from '../collection-preferences';
import ContainerWrapper from '../container';
import PaginationWrapper from '../pagination';
import TextFilterWrapper from '../text-filter';
export default class TableWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;
  private containerWrapper = new ContainerWrapper(this.getElement());

  private findNativeTable() {
    return this.find(`.${styles.wrapper} > .${styles.table}`)!;
  }

  private findActiveTHead() {
    return this.findByClassName(styles['thead-active'])!;
  }

  findHeaderSlot() {
    return this.findByClassName(styles['header-controls']);
  }
  /**
   * Alias for findHeader method for compatibility with previous versions
   * @deprecated
   */
  findHeaderRegion() {
    return this.findHeaderSlot();
  }

  findFooterSlot() {
    return this.containerWrapper.findFooter();
  }

  findColumnHeaders() {
    return this.findActiveTHead().findAll('tr > *');
  }
  /**
   * Returns the element the user clicks when resizing a column.
   *
   * @param columnIndex 1-based index of the column containing the resizer.
   */
  findColumnResizer(columnIndex: number) {
    return this.findActiveTHead().find(`th:nth-child(${columnIndex}) .${resizerStyles.resizer}`);
  }
  /**
   * Returns a table cell based on given row and column indices.
   *
   * @param rowIndex 1-based index of the row of the cell to select.
   * @param columnIndex 1-based index of the column of the cell to select.
   */
  findBodyCell(rowIndex: number, columnIndex: number) {
    return this.findNativeTable().find(`tbody tr:nth-child(${rowIndex}) td:nth-child(${columnIndex})`);
  }

  findRows() {
    return this.findNativeTable().findAllByClassName(styles.row);
  }

  findSelectedRows() {
    return this.findAllByClassName(styles['row-selected']);
  }
  /**
   * Alias for findEmptySlot method for compatibility with previous versions
   * @deprecated
   */
  findEmptyRegion() {
    return this.findEmptySlot();
  }

  findEmptySlot() {
    return this.findByClassName(styles.empty);
  }

  findLoadingText() {
    return this.findByClassName(styles.loading);
  }

  findColumnSortingArea(colIndex: number) {
    return this.findActiveTHead().find(`tr > *:nth-child(${colIndex}) [role=button]`);
  }
  /**
   * Returns the column that is used for ascending sorting.
   */
  findAscSortedColumn() {
    return this.findNativeTable().findByClassName(headerCellStyles['header-cell-ascending']);
  }
  /**
   * Returns the column that is used for descending sorting.
   */
  findDescSortedColumn() {
    return this.findNativeTable().findByClassName(headerCellStyles['header-cell-descending']);
  }
  /**
   * Returns a row selection area for a given index.
   *
   * @param rowIndex 1-based index of the row selection area to return.
   */
  findRowSelectionArea(rowIndex: number) {
    return this.findNativeTable().find(`tbody tr:nth-child(${rowIndex}) .${selectionStyles.root}`);
  }

  findSelectAllTrigger() {
    return this.findActiveTHead().find(`.${selectionStyles.root}`);
  }

  findTextFilter() {
    return this.findComponent(`.${styles['tools-filtering']}`, TextFilterWrapper);
  }

  findCollectionPreferences() {
    return this.findComponent(`.${styles['tools-preferences']}`, CollectionPreferencesWrapper);
  }

  findPagination() {
    return this.findComponent(`.${styles['tools-pagination']}`, PaginationWrapper);
  }
}

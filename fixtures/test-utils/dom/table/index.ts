// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
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

  private findNativeTable(): ElementWrapper {
    return this.find(`.${styles.wrapper} > .${styles.table}`)!;
  }

  private findActiveTHead(): ElementWrapper {
    return this.findByClassName(styles['thead-active'])!;
  }

  findHeaderSlot(): ElementWrapper | null {
    return this.findByClassName(styles['header-controls']);
  }

  /**
   * Alias for findHeader method for compatibility with previous versions
   * @deprecated
   */
  findHeaderRegion(): ElementWrapper | null {
    return this.findHeaderSlot();
  }

  findFooterSlot(): ElementWrapper | null {
    return this.containerWrapper.findFooter();
  }

  findColumnHeaders(): Array<ElementWrapper> {
    return this.findActiveTHead().findAll('tr > *');
  }

  /**
   * Returns the element the user clicks when resizing a column.
   *
   * @param columnIndex 1-based index of the column containing the resizer.
   */
  findColumnResizer(columnIndex: number): ElementWrapper | null {
    return this.findActiveTHead().find(`th:nth-child(${columnIndex}) .${resizerStyles.resizer}`);
  }

  /**
   * Returns a table cell based on given row and column indices.
   *
   * @param rowIndex 1-based index of the row of the cell to select.
   * @param columnIndex 1-based index of the column of the cell to select.
   */
  findBodyCell(rowIndex: number, columnIndex: number): ElementWrapper | null {
    return this.findNativeTable().find(`tbody tr:nth-child(${rowIndex}) td:nth-child(${columnIndex})`);
  }

  findRows(): Array<ElementWrapper> {
    return this.findNativeTable().findAllByClassName(styles.row);
  }

  findSelectedRows(): Array<ElementWrapper> {
    return this.findAllByClassName(styles['row-selected']);
  }

  /**
   * Alias for findEmptySlot method for compatibility with previous versions
   * @deprecated
   */
  findEmptyRegion(): ElementWrapper | null {
    return this.findEmptySlot();
  }

  findEmptySlot(): ElementWrapper | null {
    return this.findByClassName(styles.empty);
  }

  findLoadingText(): ElementWrapper | null {
    return this.findByClassName(styles.loading);
  }

  findColumnSortingArea(colIndex: number): ElementWrapper | null {
    return this.findActiveTHead().find(`tr > *:nth-child(${colIndex}) [role=button]`);
  }

  /**
   * Returns the column that is used for ascending sorting.
   */
  findAscSortedColumn(): ElementWrapper | null {
    return this.findNativeTable().findByClassName(headerCellStyles['header-cell-ascending']);
  }

  /**
   * Returns the column that is used for descending sorting.
   */
  findDescSortedColumn(): ElementWrapper | null {
    return this.findNativeTable().findByClassName(headerCellStyles['header-cell-descending']);
  }

  /**
   * Returns a row selection area for a given index.
   *
   * @param rowIndex 1-based index of the row selection area to return.
   */
  findRowSelectionArea(rowIndex: number): ElementWrapper | null {
    return this.findNativeTable().find(`tbody tr:nth-child(${rowIndex}) .${selectionStyles.root}`);
  }

  findSelectAllTrigger(): ElementWrapper | null {
    return this.findActiveTHead().find(`.${selectionStyles.root}`);
  }

  findTextFilter(): TextFilterWrapper | null {
    return this.findComponent(`.${styles['tools-filtering']}`, TextFilterWrapper);
  }
  findCollectionPreferences(): CollectionPreferencesWrapper | null {
    return this.findComponent(`.${styles['tools-preferences']}`, CollectionPreferencesWrapper);
  }

  findPagination(): PaginationWrapper | null {
    return this.findComponent(`.${styles['tools-pagination']}`, PaginationWrapper);
  }
}
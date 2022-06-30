// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { NonCancelableEventHandler } from '../../internal/events';

export interface TableProps<T = any> {
  header?: React.ReactNode;
  /**
   * Testing array literal
   */
  columns: TableProps.TableColumn<T>[];
  /**
   * Testing ReadonlyArray
   */
  items: ReadonlyArray<TableProps.Item>;
  filteringFn?: TableProps.FilteringFunction<T>;
  ariaLabels?: TableProps.AriaLabels<T>;
  trackBy?: TableProps.TrackBy<T>;
  onWidthChange: NonCancelableEventHandler<TableProps.ColumnWidthsChangeDetail>;
}

export namespace TableProps {
  export interface TableColumn<T = any> {
    header(item: T): React.ReactNode;
    cell(item: T): React.ReactNode;
    width?: number;
  }

  export interface Item {
    value?: string;
  }

  export type FilteringFunction<T = any> = (item: T) => boolean;

  export type ColumnWidthsChangeDetail = {
    widths: Array<number>;
  };

  export type TrackBy<T> = string | ((item: T) => boolean);

  export type ComplexAlias = Partial<ColumnWidthsChangeDetail>;

  export interface SelectionState<T> {
    selectedItems: ReadonlyArray<T>;
  }

  export interface AriaLabels<T> {
    allItemsSelectionLabel?: (data: TableProps.SelectionState<T>) => string;
  }
}

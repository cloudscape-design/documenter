// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { TableForwardRefType, TableProps } from './interfaces';

export { TableProps };

const Table = React.forwardRef(
  <T,>({ items = [], selectedItems = [], ...props }: TableProps<T>, ref: React.Ref<TableProps.Ref>) => {
    // impl
    return null;
  }
) as TableForwardRefType;

export default Table;

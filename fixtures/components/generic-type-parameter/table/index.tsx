// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface TableProps<T extends TableProps.Row> {
  /** The rows to display. */
  rows: ReadonlyArray<T>;
  /** The currently selected row. */
  selectedRow?: T;
}

export namespace TableProps {
  export interface Row {
    id: string;
  }
}

export default function Table<T extends TableProps.Row>({ rows }: TableProps<T>) {
  return <div>{rows.length}</div>;
}

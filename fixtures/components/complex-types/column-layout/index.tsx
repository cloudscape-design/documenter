// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface ColumnLayoutProps {
  columns: ColumnLayoutProps.Columns;
  widths: ColumnLayoutProps.Widths;
}

export namespace ColumnLayoutProps {
  export type Columns = 1 | 2 | 3 | 4;
  export type Widths = 25 | '50%' | 100 | '33%';
}

export default function ColumnLayout(props: ColumnLayoutProps) {
  return <div></div>;
}

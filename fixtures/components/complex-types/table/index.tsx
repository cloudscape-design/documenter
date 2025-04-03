// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { TableProps } from './interfaces';

export { TableProps };

export default function Table<T = any>(props: TableProps<T>) {
  return <table />;
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface ExampleProps {
  /**
   * Main content
   * @displayname content
   * @isChildrenDefault false
   */
  children?: React.ReactNode;
}

export default function Example({ children }: ExampleProps) {
  return <div>{children}</div>;
}

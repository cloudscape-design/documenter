// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface ExampleProps {
  /**
   * Header
   *
   * @visualrefresh
   */
  header?: string;

  /**
   * Footer
   *
   * More text
   * @visualrefresh
   */
  footer?: string;

  /**
   * Main content
   * @displayname content
   * @visualrefresh heavy font weight
   */
  children?: React.ReactNode;
}

export default function Example({ header, footer, children }: ExampleProps) {
  return (
    <div>
      <header>{header}</header>
      {children}
      {footer}
    </div>
  );
}

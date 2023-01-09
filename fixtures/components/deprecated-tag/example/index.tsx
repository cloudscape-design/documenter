// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface ExampleProps {
  /**
   * Header
   *
   */
  header?: string;

  /**
   * Adds the specified classes to the root element of the component.
   *
   * @deprecated Custom CSS is not supported.
   */
  className?: string;

  /**
   * Main content
   * @displayname content
   */
  children?: React.ReactNode;
}

export default function Example({ header, className, children }: ExampleProps) {
  return (
    <div className={className}>
      <header>{header}</header>
      {children}
    </div>
  );
}

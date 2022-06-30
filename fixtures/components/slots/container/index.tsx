// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface ContainerProps {
  /**
   * Header
   */
  header?: React.ReactNode;

  /**
   * Main content
   * @displayname content
   */
  children?: React.ReactNode;
}

export default function Container({ header, children }: ContainerProps) {
  return (
    <div>
      <header>{header}</header>
      {children}
    </div>
  );
}

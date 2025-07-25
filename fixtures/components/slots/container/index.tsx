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

  /**
   * Media content
   */
  media?: {
    content: React.ReactNode;
  };
}

export default function Container({ header, children, media }: ContainerProps) {
  return (
    <div>
      <header>{header}</header>
      {media?.content}
      {children}
    </div>
  );
}

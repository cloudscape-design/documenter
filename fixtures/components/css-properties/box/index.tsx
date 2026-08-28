// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';

export interface BoxProps {
  /**
   * Applies inline styles to the root element.
   */
  style?: React.CSSProperties;

  /**
   * The content to render.
   */
  children?: React.ReactNode;
}

/**
 * Box description
 */
export default function Box({ style, children }: BoxProps) {
  return <div style={style}>{children}</div>;
}

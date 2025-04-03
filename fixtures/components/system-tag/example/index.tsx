// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export namespace ExampleProps {
  export type Variant =
    /** primary use-case */
    | 'primary'
    /**
     * secondary use-case
     * @awsuiSystem core
     * */
    | 'secondary';
}

export interface ExampleProps {
  /**
   * Color
   *
   * @awsuiSystem core
   */
  color?: string;

  /**
   * Font family
   *
   * More text
   * @awsuiSystem core
   * @awsuiSystem something
   */
  fontFamily?: string;

  /**
   * Variant
   */
  variant?: ExampleProps.Variant;

  /**
   * Main content
   */
  children?: React.ReactNode;
}

export default function Example({ color, fontFamily, children }: ExampleProps) {
  return (
    <button color={color} style={{ fontFamily }}>
      {children}
    </button>
  );
}

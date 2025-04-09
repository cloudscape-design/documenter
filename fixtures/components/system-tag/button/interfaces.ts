// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export interface ButtonProps {
  variant?: ButtonProps.Variant;

  /**
   * @awsuiSystem core
   */
  size: 'small' | 'medium' | 'large';

  color?:
    | 'normal'
    /** @awsuiSystem core */
    | 'danger';
}

export namespace ButtonProps {
  export type Variant =
    | 'primary'
    | 'secondary'
    /** @awsuiSystem core */
    | 'fire'
    /**
     * @awsuiSystem core
     * @awsuiSystem experimental
     */
    | 'ultra';
}

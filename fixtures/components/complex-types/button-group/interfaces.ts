// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface ButtonGroupProps {
  /**
   * This is variant
   */
  variant: ButtonGroupProps.Variant;

  /**
   * This is items array
   */
  items: ReadonlyArray<ButtonGroupProps.Item>;
}

export namespace ButtonGroupProps {
  export type Variant = 'icon';

  export type Item = { id: string };
}

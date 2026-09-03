// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

declare module '@fixtures/upstream/checkbox' {
  export interface BaseCheckboxProps {
    /**
     * ARIA label of the checkbox control
     */
    ariaLabel: string;
  }

  export interface CheckboxProps {
    /**
     * Visible checkbox label
     */
    children?: React.ReactNode;
  }

  export namespace CheckboxProps {
    export interface EventDetail {
      checked: boolean;
      indeterminate: boolean;
    }
  }
}

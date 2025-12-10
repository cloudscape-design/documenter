// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';

interface FocusableForwardRefType {
  <T>(props: FocusableProps<T>): JSX.Element;
}

export interface FocusableProps<T> {
  items: ReadonlyArray<T>;
  count?: number;
  enabled?: boolean;
  children: React.ReactNode;
}

export namespace FocusableProps {
  export interface Ref {
    /**
     * Focuses the nth item in the component
     */
    focus(rowIndex: number): void;
  }
}

/**
 * Forward ref with type parameters example
 */
const Focusable = React.forwardRef(
  <T,>({ children, items, count = 123, enabled = true }: FocusableProps<T>, ref: React.Ref<FocusableProps.Ref>) => {
    React.useImperativeHandle(ref, () => ({
      focus(rowIndex: number) {},
    }));
    return <button>Test</button>;
  },
) as FocusableForwardRefType;

export default Focusable;

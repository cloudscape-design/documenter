// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface FocusableProps {
  type?: string;
  count?: number;
  enabled?: boolean;
  children: React.ReactNode;
}

namespace SomethingElse {
  export interface Ref {
    /**
     * Should be ignored
     */
    value: string;
  }
}

export namespace FocusableProps {
  export interface Ref {
    /**
     * Focuses the primary element
     */
    focus(): void;

    /**
     * Focuses element using the CSS-selector
     */
    focusBySelector(selector: string): void;

    /**
     * Showcase for optional functions
     */
    cancelEdit?(): void;
  }
}

/**
 * Forward ref example
 */
const Focusable = React.forwardRef(
  ({ children, type = 'text', count = 123, enabled = true }: FocusableProps, ref: React.Ref<FocusableProps.Ref>) => {
    return <button ref={ref}>Test</button>;
  }
);

export default Focusable;

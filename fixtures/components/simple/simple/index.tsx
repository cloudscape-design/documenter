// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { CancelableEventHandler, NonCancelableEventHandler } from '../../internal/events';

export interface SimpleProps {
  /**
   * This is name
   * More text to have multi-line comment
   */
  name: string;

  /**
   * Boolean example
   */
  enabled?: boolean;

  /**
   * Number example
   */
  count?: number;

  /**
   * This is variant
   */
  variant?: 'button' | 'link';

  /**
   * Fired when user clicks
   */
  onClick?: CancelableEventHandler;

  /**
   * Fired when user clicks without modifier keys pressed
   */
  onFollow?: NonCancelableEventHandler;
}

/**
 * Component-level description
 */
export default function Simple({ name, variant = 'button', enabled = true, count = 123 }: SimpleProps) {
  return (
    <div className={variant} aria-disabled={!enabled}>
      {name}: {count}
    </div>
  );
}

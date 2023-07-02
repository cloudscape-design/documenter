// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { CancelableEventHandler } from '../../internal/events';

export interface ButtonProps {
  /**
   * String example
   */
  children: string;

  /**
   * Fired when user clicks
   */
  onClick?: CancelableEventHandler | undefined;
}

/**
 * Component-level description
 */
export default function Button({ children, onClick }: ExactOptionalPropertyTypesProps) {
  return <button onClick={onClick}>{children}</button>;
}

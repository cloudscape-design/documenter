// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { NonCancelableEventHandler } from '../../internal/events';

export interface ErrorBoundaryProps {
  /**
   * React content.
   */
  children: React.ReactNode;
  /**
   * A special callback that fires when an error is captured.
   */
  onError: (error: Error, errorInfo: React.ErrorInfo) => void;
  /**
   * A callback that fires when the user clicks on the refresh button.
   */
  onRefresh?: NonCancelableEventHandler;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps): JSX.Element {
  return <div>{children}</div>;
}

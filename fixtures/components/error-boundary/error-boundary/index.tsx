// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface ErrorBoundaryProps {
  /**
   * React content.
   */
  children: React.ReactNode;
  /**
   * Callback that fires when an error is captured.
   */
  onError: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps): JSX.Element {
  return <div>{children}</div>;
}

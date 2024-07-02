// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface ExampleProps {
  /**
   * @analytics View details in Analytics tab
   */
  analyticsMetadata?: string;
  children?: React.ReactNode;
}

export default function Example({ children }: ExampleProps): JSX.Element {
  return <div>{children}</div>;
}

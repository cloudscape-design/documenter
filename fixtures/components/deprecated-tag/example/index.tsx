// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { NonCancelableEventHandler } from '../../internal/events';

export interface ExampleProps {
  /**
   * Header
   *
   */
  header?: string;

  /**
   * Adds the specified classes to the root element of the component.
   *
   * @deprecated Custom CSS is not supported.
   */
  className?: string;

  /**
   * Main content
   * @displayname content
   * @deprecated This slot is not supported.
   */
  children?: React.ReactNode;

  /**
   * Fired when the user clicks the button.
   * @deprecated This event handler is not supported.
   */
  onButtonClick?: NonCancelableEventHandler;
}

export default function Example({ header, className, children, onButtonClick }: ExampleProps) {
  return (
    <div className={className}>
      <header>{header}</header>
      <button onClick={onButtonClick}>A Button</button>
      {children}
    </div>
  );
}

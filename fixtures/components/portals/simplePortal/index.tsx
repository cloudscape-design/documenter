// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { createPortal } from 'react-dom';
import { SimpleProps } from '../../simple/simple';

export interface SimplePortalProps extends SimpleProps {
  /**
   * Portal content
   * @displayname content
   */
  children?: React.ReactNode;
}

/**
 * Component-level description
 */
export default function SimplePortal({
  name,
  variant = 'button',
  enabled = true,
  count = 123,
  children,
}: SimplePortalProps) {
  return createPortal(() => {
    return (
      <div className={variant} aria-disabled={!enabled}>
        <p>
          {name}: {count}
        </p>
        <div>{children}</div>
      </div>
    );
  }, document.body);
}

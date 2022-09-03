// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BaseComponentProps } from '../internal/base-component';
import { InternalBaseComponentProps } from '../internal/hooks/use-base-component';
import { IconProps } from '../icon/interfaces';

export interface StatusIndicatorProps extends BaseComponentProps {
  /**
   * Specifies the status type.
   */
  type?: StatusIndicatorProps.Type;
  /**
   * A text fragment that communicates the status.
   */
  children?: React.ReactNode;
  /**
   * Specifies an `aria-label` for the icon. If the status text alone does not fully describe the status,
   * use this to communicate additional context.
   */
  iconAriaLabel?: string;
  /**
   * Specifies an override for the status indicator color.
   */
  colorOverride?: StatusIndicatorProps.Color;
  /**
   * Specifies if the text content should wrap. If you set it to false, it prevents the text from wrapping
   * and truncates it with an ellipsis.
   */
  wrapText?: boolean;
}

interface InternalStatusIndicatorProps extends StatusIndicatorProps, InternalBaseComponentProps {
  /**
   * Play an animation on the error icon when first rendered
   */
  __animate?: boolean;

  /**
   * Size of icon.
   */
  __size?: IconProps.Size;
}

export namespace StatusIndicatorProps {
  // Why not enums? Explained there
  // https://stackoverflow.com/questions/52393730/typescript-string-literal-union-type-from-enum
  export type Type = 'error' | 'warning' | 'success' | 'info' | 'stopped' | 'pending' | 'in-progress' | 'loading';
  export type Color = 'blue' | 'grey' | 'green' | 'red';
}

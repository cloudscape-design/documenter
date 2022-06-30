// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';

/**
 * Simplified version of ResizeObserverEntry
 *
 * @property target Hello target
 */
export interface ContainerQueryEntry {
  /** Target element */
  target: Element;
  /** Element's content box width */
  contentBoxWidth: number;
  /** Element's content box height */
  contentBoxHeight: number;
  /** Element's border box width */
  borderBoxWidth: number;
  /** Element's border box height */
  borderBoxHeight: number;
  width: number; // Same as contentWidth, added for consistency with old API
  height: number; // Same as contentHeight, added for consistency with old API
}

/**
 * React reference or element callback
 */
export type ElementReference = (() => Element | null) | React.RefObject<Element>;

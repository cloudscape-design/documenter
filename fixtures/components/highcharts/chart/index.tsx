// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { NonCancelableEventHandler } from '../../internal/events';

namespace Highcharts {
  export interface Point {
    x: number;
    y: number;
  }
}

export interface ChartProps {
  onHighlight?: NonCancelableEventHandler<{ point: Highcharts.Point }>;
}

/**
 * Chart description
 */
export default function Chart({ onHighlight }: ChartProps) {
  return (
    <svg>
      <div onMouseOver={() => onHighlight?.({ detail: { point: { x: 0, y: 0 } } })}></div>
    </svg>
  );
}

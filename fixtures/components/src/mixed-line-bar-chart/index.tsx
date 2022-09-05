// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { MixedLineBarChartProps } from './interfaces';

export { MixedLineBarChartProps };

export default function MixedLineBarChart<T extends number | string | Date>({
  height = 500,
  xScaleType = 'linear',
  yScaleType = 'linear',
  stackedBars = false,
  horizontalBars = false,
  statusType = 'finished',
  detailPopoverSize = 'medium',
  emphasizeBaselineAxis = true,
  ...props
}: MixedLineBarChartProps<T>) {
  // impl
}

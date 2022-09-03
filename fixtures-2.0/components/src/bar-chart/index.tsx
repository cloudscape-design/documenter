// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { BarChartProps } from './interfaces';

export { BarChartProps };

function BarChart<T extends number | string | Date>({
  height = 500,
  xScaleType = 'linear',
  yScaleType = 'linear',
  series = [],
  detailPopoverSize = 'medium',
  statusType = 'finished',
  emphasizeBaselineAxis = true,
  ...props
}: BarChartProps<T>) {
  // impl
}

export default BarChart;

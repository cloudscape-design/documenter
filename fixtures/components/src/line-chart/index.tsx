// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { LineChartProps } from './interfaces';

export { LineChartProps };

function LineChart<T extends number | string | Date>({
  height = 500,
  xScaleType = 'linear',
  yScaleType = 'linear',
  series = [],
  detailPopoverSize = 'medium',
  statusType = 'finished',
  emphasizeBaselineAxis = true,
  ...props
}: LineChartProps<T>) {
  // impl
}

export default LineChart;

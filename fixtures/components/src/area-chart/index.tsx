// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { AreaChartProps } from './interfaces';

export { AreaChartProps };

function AreaChart<T extends AreaChartProps.DataTypes>({
  height = 500,
  xScaleType = 'linear',
  yScaleType = 'linear',
  statusType = 'finished',
  detailPopoverSize = 'medium',
  i18nStrings = {},
  ...props
}: AreaChartProps<T>) {
  // impl
}

export default AreaChart;

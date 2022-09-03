// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { PieChartProps } from './interfaces';

export { PieChartProps };

const PieChart = function PieChart<T extends PieChartProps.Datum = PieChartProps.Datum>({
  variant = 'pie',
  size = 'medium',
  hideLegend = false,
  hideFilter = false,
  statusType = 'finished',
  data: externalData = [],
  i18nStrings,
  highlightedSegment: controlledHighlightedSegment,
  visibleSegments: controlledVisibleSegments,
  onHighlightChange: controlledOnHighlightChange,
  onFilterChange,
  additionalFilters,
  legendTitle,
  detailPopoverSize = 'medium',
  ...props
}: PieChartProps<T>) {
  // impl
  return null;
};

export default PieChart;

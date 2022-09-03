// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
import ChartLegendWrapper from './chart-legend';
import ChartFilterWrapper from './chart-filter';
import ChartPopoverWrapper from './chart-popover';
const legendStyles: any = {};
const filterStyles: any = {};
const popoverStyles: any = {};
const statusContainerStyles: any = {};

export default class CommonChartWrapper extends ComponentWrapper {
  findDefaultFilter(): ChartFilterWrapper | null {
    return this.findComponent(`.${filterStyles['chart-filter']}`, ChartFilterWrapper);
  }

  findStatusContainer(): ElementWrapper | null {
    return this.findByClassName(statusContainerStyles.root);
  }

  findLegend(): ChartLegendWrapper | null {
    return this.findComponent(`.${legendStyles.root}`, ChartLegendWrapper);
  }

  findDetailPopover(): ChartPopoverWrapper | null {
    return this.findComponent(`.${popoverStyles.root}`, ChartPopoverWrapper);
  }
}

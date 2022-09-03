// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import ChartLegendWrapper from './chart-legend';
import ChartFilterWrapper from './chart-filter';
import ChartPopoverWrapper from './chart-popover';
const legendStyles: any = {};
const filterStyles: any = {};
const popoverStyles: any = {};
const statusContainerStyles: any = {};
export default class CommonChartWrapper extends ComponentWrapper {
  findDefaultFilter() {
    return this.findComponent(`.${filterStyles['chart-filter']}`, ChartFilterWrapper);
  }

  findStatusContainer() {
    return this.findByClassName(statusContainerStyles.root);
  }

  findLegend() {
    return this.findComponent(`.${legendStyles.root}`, ChartLegendWrapper);
  }

  findDetailPopover() {
    return this.findComponent(`.${popoverStyles.root}`, ChartPopoverWrapper);
  }
}

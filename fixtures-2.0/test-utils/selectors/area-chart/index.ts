// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
const chartPlotStyles: any = {};
import { BaseCartesianChartWrapper } from '../mixed-line-bar-chart/index.js';
export default class AreaChartWrapper extends BaseCartesianChartWrapper {
  static rootSelector: string = styles.root;

  findChart() {
    return this.findByClassName(chartPlotStyles.root);
  }
  /**
   * Returns an array of chart series. Note that thresholds count as series as well.
   */

  findSeries() {
    return this.findAllByClassName(styles.series);
  }

  findHighlightedSeries() {
    return this.findByClassName(styles['series--highlighted']);
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import ChartWrapper from '../internal/charts';
const styles: any = {};
const chartPlotStyles: any = {};
const cartesianStyles: any = {};
export class BaseCartesianChartWrapper extends ChartWrapper {
  findFilterContainer() {
    return this.findByClassName(cartesianStyles['filter-container']);
  }

  findChart() {
    return this.findByClassName(chartPlotStyles.root);
  }
  /**
   * Returns a focusable element that controls keyboard interactions.
   */

  findApplication() {
    return this.findByClassName(chartPlotStyles.application);
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

  findXAxisTitle() {
    return this.findByClassName(cartesianStyles['axis-label--x']);
  }

  findYAxisTitle() {
    return this.findByClassName(cartesianStyles['axis-label--y']);
  }

  findXTicks() {
    return this.findAllByClassName(cartesianStyles['ticks--x']);
  }

  findYTicks() {
    return this.findAllByClassName(cartesianStyles['ticks--y']);
  }
}
export default class MixedLineBarChartWrapper extends BaseCartesianChartWrapper {
  static rootSelector: string = styles.root;
  /**
   * Returns an array of bar groups, which are used for mouse navigation if a chart contains bar series.
   */

  findBarGroups() {
    return this.findAllByClassName(styles['bar-group']);
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import CommonChartWrapper from '../internal/charts';
const styles: any = {};
const chartPlotStyles: any = {};
export default class PieChartWrapper extends CommonChartWrapper {
  static rootSelector: string = styles.root;

  findFilterContainer() {
    return this.findByClassName(styles['filter-container']);
  }

  findSegments() {
    return this.findAllByClassName(styles.segment);
  }

  findHighlightedSegment() {
    return this.findByClassName(styles['segment--highlighted']);
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

  findInnerContent() {
    return this.findByClassName(styles['inner-content']);
  }

  findSegmentLabels() {
    return this.findAllByClassName(styles.label);
  }

  findHighlightedSegmentLabel() {
    return this.findByClassName(styles['label--highlighted']);
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class ChartLegendWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findTitle() {
    return this.findByClassName(styles.title);
  }

  findHighlightedItem() {
    return this.findByClassName(styles['marker--highlighted']);
  }

  findItems() {
    return this.findAllByClassName(styles.marker);
  }

  findNativeList() {
    return this.findByClassName(styles.list);
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
const styles: any = {};

export default class ChartLegendWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findTitle(): ElementWrapper | null {
    return this.findByClassName(styles.title);
  }

  findHighlightedItem(): ElementWrapper | null {
    return this.findByClassName(styles['marker--highlighted']);
  }

  findItems(): Array<ElementWrapper> {
    return this.findAllByClassName(styles.marker);
  }

  findNativeList(): ElementWrapper | null {
    return this.findByClassName(styles.list);
  }
}
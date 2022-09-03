// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class SegmentedControlWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findSegments() {
    return this.findAllByClassName(styles.segment);
  }

  findSelectedSegment() {
    return this.findByClassName(styles.selected);
  }
}

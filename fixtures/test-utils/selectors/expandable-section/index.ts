// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
const containerStyles: any = {};
export default class ExpandableSectionWrapper extends ComponentWrapper {
  static rootSelector = styles.root;

  findHeader() {
    return this.findByClassName(styles.header)!;
  }

  findContent() {
    return this.findByClassName(styles.content)!;
  }

  findExpandedContent() {
    return this.find(
      `:scope > .${styles['content-expanded']}, :scope > .${containerStyles.content} > .${styles['content-expanded']}`
    );
  }

  findExpandIcon() {
    return this.findByClassName(styles['icon-container'])!;
  }
}

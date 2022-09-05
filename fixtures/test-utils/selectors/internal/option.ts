// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper, ComponentWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class OptionWrapper extends ComponentWrapper {
  static rootSelector: string = styles.option;

  findLabel() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.findByClassName(styles.label)!;
  }

  findDescription() {
    return this.findByClassName(styles.description);
  }

  findLabelTag() {
    return this.findByClassName(styles['label-tag']);
  }

  findTags() {
    return this.findAllByClassName(styles.tag);
  }
}

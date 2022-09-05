// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class HeaderWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findHeadingText() {
    return this.findByClassName(styles['heading-text'])!;
  }

  findCounter() {
    return this.findByClassName(styles.counter);
  }

  findDescription() {
    return this.findByClassName(styles.description);
  }

  findInfo() {
    return this.findByClassName(styles.info);
  }

  findActions() {
    return this.findByClassName(styles.actions);
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class AbstractSwitchWrapper extends ElementWrapper {
  static rootSelector = styles.wrapper;

  findLabel() {
    return this.findByClassName(styles['label-wrapper'])!;
  }

  findNativeInput() {
    return this.find(`.${styles.control} > input`)!;
  }

  findDescription() {
    return this.findByClassName(styles.description);
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class FormWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findHeader() {
    return this.findByClassName(styles.header);
  }

  findContent() {
    return this.findByClassName(styles.content);
  }

  findError() {
    return this.findByClassName(styles.error);
  }

  findActions() {
    return this.findByClassName(styles.actions);
  }

  findSecondaryActions() {
    return this.findByClassName(styles['secondary-actions']);
  }
}

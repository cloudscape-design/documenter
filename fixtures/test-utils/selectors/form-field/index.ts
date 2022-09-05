// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class FormFieldWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findControl() {
    return this.findByClassName(styles.control);
  }

  findLabel() {
    return this.findByClassName(styles.label);
  }

  findInfo() {
    return this.findByClassName(styles.info);
  }

  findConstraint() {
    return this.find(`:scope > .${styles.hints} .${styles.constraint}`);
  }

  findError() {
    return this.find(`:scope > .${styles.hints} .${styles.error__message}`);
  }

  findDescription() {
    return this.findByClassName(styles.description);
  }

  findSecondaryControl() {
    return this.findByClassName(styles['secondary-control']);
  }
}

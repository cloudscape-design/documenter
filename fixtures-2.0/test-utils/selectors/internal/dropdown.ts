// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class DropdownWrapper extends ElementWrapper {
  static rootSelector: string = styles.root;

  findOpenDropdown() {
    return this.find(`.${styles.dropdown}[data-open=true]`);
  }
}

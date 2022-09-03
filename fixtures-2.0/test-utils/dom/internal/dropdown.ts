// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
const styles: any = {};
export default class DropdownWrapper extends ElementWrapper {
  static rootSelector: string = styles.root;

  findOpenDropdown(): ElementWrapper | null {
    return this.find(`.${styles.dropdown}[data-open=true]`);
  }
}

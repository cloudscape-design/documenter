// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import SelectWrapper from '../select';
const styles: any = {};
export default class FilteringTokenWrapper extends ComponentWrapper {
  static rootSelector = styles.root;

  findLabel() {
    return this.findByClassName(styles['token-content'])!;
  }

  findRemoveButton() {
    return this.findByClassName(styles['dismiss-button'])!;
  }

  findTokenOperation() {
    return this.findComponent(`.${styles.select}`, SelectWrapper);
  }
}

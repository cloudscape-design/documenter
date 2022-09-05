// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
import InputWrapper from '../input';
export default class TextFilterWrapper extends ComponentWrapper {
  static rootSelector = styles.root;

  findInput() {
    return this.findComponent(`.${styles.input}`, InputWrapper)!;
  }

  findResultsCount() {
    return this.findByClassName(styles.results)!;
  }
}

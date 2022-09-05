// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act, Simulate } from 'react-dom/test-utils';
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const selectors: any = {};
export default class TextareaWrapper extends ComponentWrapper {
  static rootSelector: string = selectors.root;

  findNativeTextarea() {
    return this.find(`.${selectors.textarea}`)!;
  }
  /**
   * Sets the value of the component and calls the onChange handler.
   *
   * @param value value to set the textarea to.
   */
}

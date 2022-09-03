// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act } from 'react-dom/test-utils';
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import ButtonWrapper from '../button';
const styles: any = {};
export default class CodeEditorWrapper extends ComponentWrapper {
  static rootSelector: string = styles['code-editor'];

  findEditor() {
    return this.findByClassName(styles.editor);
  }

  findNativeTextArea() {
    return this.find('textarea.ace_text-input');
  }

  findErrorsTab() {
    return this.findByClassName(styles['tab-button--errors']);
  }

  findWarningsTab() {
    return this.findByClassName(styles['tab-button--warnings']);
  }

  findSettingsButton() {
    return this.findComponent(`.${styles['status-bar__cog-button']} button`, ButtonWrapper);
  }

  findStatusBar() {
    return this.findByClassName(styles['status-bar']);
  }

  findPane() {
    return this.findByClassName(styles.pane);
  }

  findLoadingScreen() {
    return this.findByClassName(styles['loading-screen']);
  }

  findErrorScreen() {
    return this.findByClassName(styles['error-screen']);
  }
  /**
   * Sets the value of the component and calls the `onChange` handler
   *
   * @param value The value the input is set to.
   */
}

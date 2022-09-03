// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act } from 'react-dom/test-utils';
import { ComponentWrapper, ElementWrapper, usesDom } from '@cloudscape-design/test-utils-core/dom';
import ButtonWrapper from '../button';

const styles: any = {};

export default class CodeEditorWrapper extends ComponentWrapper {
  static rootSelector: string = styles['code-editor'];

  findEditor(): ElementWrapper | null {
    return this.findByClassName(styles.editor);
  }

  findNativeTextArea(): ElementWrapper<HTMLTextAreaElement> | null {
    return this.find<HTMLTextAreaElement>('textarea.ace_text-input');
  }

  findErrorsTab(): ElementWrapper | null {
    return this.findByClassName(styles['tab-button--errors']);
  }

  findWarningsTab(): ElementWrapper | null {
    return this.findByClassName(styles['tab-button--warnings']);
  }

  findSettingsButton(): ButtonWrapper | null {
    return this.findComponent(`.${styles['status-bar__cog-button']} button`, ButtonWrapper);
  }

  findStatusBar(): ElementWrapper | null {
    return this.findByClassName(styles['status-bar']);
  }

  findPane(): ElementWrapper | null {
    return this.findByClassName(styles.pane);
  }

  findLoadingScreen(): ElementWrapper | null {
    return this.findByClassName(styles['loading-screen']);
  }

  findErrorScreen(): ElementWrapper | null {
    return this.findByClassName(styles['error-screen']);
  }

  /**
   * Sets the value of the component and calls the `onChange` handler
   *
   * @param value The value the input is set to.
   */
  @usesDom setValue(value: string): void {
    const editor = this.findEditor()?.getElement() as any;
    if (editor && 'env' in editor) {
      act(() => {
        editor.env.editor.setValue(value, -1);
      });
    }
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import RadioButtonWrapper from '../radio-group/radio-button';
const styles: any = {};
export default class TileWrapper extends ElementWrapper {
  static rootSelector: string = styles['tile-container'];

  private findRadioButton() {
    return new RadioButtonWrapper(this.getElement());
  }

  findLabel() {
    return this.findRadioButton().findLabel();
  }

  findDescription() {
    return this.findRadioButton().findDescription();
  }

  findImage() {
    return this.findByClassName(styles.image)!;
  }

  findNativeInput() {
    return this.findRadioButton().findNativeInput();
  }
}

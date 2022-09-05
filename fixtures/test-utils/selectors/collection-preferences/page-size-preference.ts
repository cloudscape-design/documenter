// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import FormFieldWrapper from '../form-field';
import RadioGroupWrapper from '../radio-group';
import RadioButtonWrapper from '../radio-group/radio-button';
const styles: any = {};
export default class PageSizePreferenceWrapper extends ComponentWrapper {
  static rootSelector = styles['page-size'];

  findTitle() {
    return this.findComponent(`.${styles['page-size-form-field']}`, FormFieldWrapper)!.findLabel()!;
  }

  findOptions() {
    return this.findComponent(`.${styles['page-size-radio-group']}`, RadioGroupWrapper)!.findButtons();
  }
}

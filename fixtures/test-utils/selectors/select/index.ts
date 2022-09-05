// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const selectStyles: any = {};
const selectPartsStyles: any = {};
const inputStyles: any = {};
const buttonTriggerStyles: any = {};
const dropdownStatusStyles: any = {};
const footerStyles: any = {};
import InputWrapper from '../input';
import DropdownHostComponentWrapper from '../internal/dropdown-host';
export default class SelectWrapper extends DropdownHostComponentWrapper {
  static rootSelector: string = selectStyles.root;
  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */

  findErrorRecoveryButton(
    options = {
      expandToViewport: false,
    }
  ) {
    return this.findDropdown(options).findByClassName(footerStyles.recovery);
  }
  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */

  findStatusIndicator(
    options = {
      expandToViewport: false,
    }
  ) {
    return this.findDropdown(options).findByClassName(dropdownStatusStyles.root);
  }
  /**
   * Returns the input that is used for filtering. Returns `null` if `enableFiltering` is not set to `true`.
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */

  findFilteringInput(
    options = {
      expandToViewport: false,
    }
  ) {
    return this.findDropdown(options).findComponent(`.${inputStyles['input-container']}`, InputWrapper);
  }

  findPlaceholder() {
    return this.findByClassName(selectPartsStyles.placeholder);
  }

  findTrigger() {
    return this.findByClassName(buttonTriggerStyles['button-trigger'])!;
  }
}

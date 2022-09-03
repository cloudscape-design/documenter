// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper, usesDom } from '@cloudscape-design/test-utils-core/dom';
const multiselectStyles: any = {};
const tokenGroupStyles: any = {};
const inputStyles: any = {};
const buttonTriggerStyles: any = {};
const dropdownStatusStyles: any = {};
const footerStyles: any = {};
import TokenWrapper from '../token-group/token';
import InputWrapper from '../input';
import TokenGroupWrapper from '../token-group';
import DropdownHostComponentWrapper from '../internal/dropdown-host';

export default class MultiselectWrapper extends DropdownHostComponentWrapper {
  static rootSelector: string = multiselectStyles.root;

  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */
  findErrorRecoveryButton(options = { expandToViewport: false }): ElementWrapper | null {
    return this.findDropdown(options).findByClassName(footerStyles.recovery);
  }

  /**
   * Returns the input that is used for filtering. Returns `null` if `enableFiltering` is not set to `true`.
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */
  findFilteringInput(options = { expandToViewport: false }): InputWrapper | null {
    return this.findDropdown(options).findComponent(`.${inputStyles['input-container']}`, InputWrapper);
  }

  findPlaceholder(): ElementWrapper | null {
    return this.findByClassName(buttonTriggerStyles.placeholder);
  }

  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */
  findStatusIndicator(options = { expandToViewport: false }): ElementWrapper | null {
    return this.findDropdown(options).findByClassName(dropdownStatusStyles.root);
  }

  /**
   * Returns a token.
   *
   * @param tokenIndex 1-based index of the token to return
   */
  findToken(tokenIndex: number): TokenWrapper | null {
    const tokenGroup = this.findComponent(`.${tokenGroupStyles.root}`, TokenGroupWrapper);
    return tokenGroup!.findToken(tokenIndex);
  }

  /**
   * Returns a token toggle button.
   */
  findTokenToggle(): ElementWrapper | null {
    const tokenGroup = this.findComponent(`.${tokenGroupStyles.root}`, TokenGroupWrapper);
    return tokenGroup!.findTokenToggle();
  }

  findTokens(): Array<TokenWrapper> {
    const tokenGroup = this.findComponent(`.${tokenGroupStyles.root}`, TokenGroupWrapper);
    return tokenGroup?.findTokens() || [];
  }

  findTrigger(): ElementWrapper {
    return this.findByClassName(buttonTriggerStyles['button-trigger'])!;
  }

  @usesDom
  isDisabled(): boolean {
    return (this.findTrigger().getElement() as HTMLButtonElement).disabled;
  }
}

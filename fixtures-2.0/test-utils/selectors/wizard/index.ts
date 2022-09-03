// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const formStyles: any = {};
const styles: any = {};
import ButtonWrapper from '../button';
import FormWrapper from '../form';
import HeaderWrapper from '../header';
export default class WizardWrapper extends FormWrapper {
  static rootSelector = styles.root;

  findHeader() {
    return this.findByClassName(styles['form-header-component']);
  }

  findInfo() {
    return this.findComponent(`.${styles['form-header']}`, HeaderWrapper)!.findInfo();
  }

  findCancelButton() {
    return this.findComponent(`.${styles['cancel-button']}`, ButtonWrapper)!;
  }

  findSkipToButton() {
    return this.findComponent(`.${styles['skip-to-button']}`, ButtonWrapper)!;
  }

  findPreviousButton() {
    return this.findComponent(`.${styles['previous-button']}`, ButtonWrapper);
  }

  findPrimaryButton() {
    return this.findComponent(`.${styles['primary-button']}`, ButtonWrapper)!;
  }

  findMenuNavigationLinks() {
    return this.findAllByClassName(styles['navigation-link']);
  }
  /**
   * Returns a link for a given step number.
   *
   * @param stepNumber 1-based step index
   * @param state
   *
   * [optional] State of the link. The method returns null if the specified step does not match the state. It can be
   *  - "disabled": for disabled menu entries
   *  - "active": for the active menu entry
   *  - undefined: for any entry
   */

  findMenuNavigationLink(stepNumber: number, state?: string) {
    const additionalClassName = state ? `.${styles[`navigation-link-${state}`]}` : '';
    return this.find(
      `.${styles['navigation-link-item']}:nth-child(${stepNumber}) .${styles['navigation-link']}${additionalClassName}`
    );
  }

  findSecondaryActions() {
    return this.findByClassName(formStyles['secondary-actions']);
  }
}

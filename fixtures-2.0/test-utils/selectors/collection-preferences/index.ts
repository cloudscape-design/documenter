// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper, createWrapper } from '@cloudscape-design/test-utils-core/selectors';
import ButtonWrapper from '../button';
import CheckboxWrapper from '../checkbox';
import ModalWrapper from '../modal';
import VisibleContentPreferenceWrapper from './visible-content-preference';
import PageSizePreferenceWrapper from './page-size-preference';
const styles: any = {};

class PreferencesModalWrapper extends ModalWrapper {
  static rootSelector = styles['modal-root'];

  findCancelButton() {
    return this.findComponent(`.${styles['cancel-button']}`, ButtonWrapper);
  }

  findConfirmButton() {
    return this.findComponent(`.${styles['confirm-button']}`, ButtonWrapper);
  }

  findWrapLinesPreference() {
    return this.findComponent(`.${styles['wrap-lines']}`, CheckboxWrapper);
  }

  findPageSizePreference() {
    return this.findComponent(`.${PageSizePreferenceWrapper.rootSelector}`, PageSizePreferenceWrapper);
  }

  findVisibleContentPreference() {
    return this.findComponent(`.${VisibleContentPreferenceWrapper.rootSelector}`, VisibleContentPreferenceWrapper);
  }

  findCustomPreference() {
    return this.findByClassName(styles.custom);
  }
}

export default class CollectionPreferencesWrapper extends ComponentWrapper {
  static rootSelector = styles.root;

  findModal() {
    return createWrapper().findComponent(`.${styles['modal-root']}`, PreferencesModalWrapper);
  }

  findTriggerButton() {
    return this.findComponent(`.${styles['trigger-button']}`, ButtonWrapper)!;
  }
}

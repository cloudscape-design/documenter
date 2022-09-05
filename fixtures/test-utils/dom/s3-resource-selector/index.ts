// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper, ComponentWrapper } from '@cloudscape-design/test-utils-core/dom';
import createWrapper from '../';
import InputWrapper from '../input';
import SelectWrapper from '../select';
import ButtonWrapper from '../button';
import ModalWrapper from '../modal';
import TableWrapper from '../table';
const styles: any = {};
const inContextStyles: any = {};
const modalStyles: any = {};

class S3ModalWrapper extends ModalWrapper {
  findSubmitButton(): ButtonWrapper {
    return this.findComponent(`.${modalStyles['submit-button']}`, ButtonWrapper)!;
  }
}

class S3InContextWrapper extends ComponentWrapper {
  findUriInput(): InputWrapper {
    return this.findComponent(`.${inContextStyles['layout-uri']}`, InputWrapper)!;
  }

  findVersionsSelect(): SelectWrapper | null {
    const select = this.findByClassName(inContextStyles['layout-version']);
    return select && select.findSelect();
  }

  findViewButton(): ButtonWrapper {
    return this.findComponent(`.${inContextStyles['view-button']}`, ButtonWrapper)!;
  }

  findBrowseButton(): ButtonWrapper {
    return this.findComponent(`.${inContextStyles['browse-button']}`, ButtonWrapper)!;
  }
}

export default class S3ResourceSelectorWrapper extends ComponentWrapper {
  static rootSelector = styles.root;

  findAlertSlot(): ElementWrapper | null {
    return this.findByClassName(styles.alert);
  }

  findInContext(): S3InContextWrapper {
    return this.findComponent(`.${inContextStyles.root}`, S3InContextWrapper)!;
  }

  findModal(): S3ModalWrapper | null {
    const modal = createWrapper().findModal();
    return modal && new S3ModalWrapper(modal.getElement());
  }

  findTable(): TableWrapper | null {
    const modal = this.findModal();
    return modal && modal.findComponent(`.${TableWrapper.rootSelector}`, TableWrapper);
  }
}

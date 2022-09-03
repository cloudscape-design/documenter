// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/dom';

import ButtonWrapper from '../button';

const styles: any = {};
const popoverStyles: any = {};

export default class AnnotationWrapper extends ComponentWrapper {
  static rootSelector: string = styles.annotation;

  findNextButton(): ButtonWrapper {
    return this.findComponent(`.${styles['next-button']}`, ButtonWrapper)!;
  }

  findPreviousButton(): ButtonWrapper {
    return this.findComponent(`.${styles['previous-button']}`, ButtonWrapper)!;
  }

  findFinishButton(): ButtonWrapper {
    return this.findComponent(`.${styles['finish-button']}`, ButtonWrapper)!;
  }

  findStepCounter(): ElementWrapper {
    return this.findByClassName(styles['step-counter-content'])!;
  }

  findHeader(): ElementWrapper {
    return this.findByClassName(styles.header)!;
  }

  findContent(): ElementWrapper {
    return this.findByClassName(styles.content)!;
  }

  findDismissButton(): ButtonWrapper {
    return this.findComponent(`.${popoverStyles['dismiss-control']}`, ButtonWrapper)!;
  }
}

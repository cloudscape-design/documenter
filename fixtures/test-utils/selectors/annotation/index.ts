// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
const popoverStyles: any = {};
import ButtonWrapper from '../button';
export default class AnnotationWrapper extends ComponentWrapper {
  static rootSelector: string = styles.annotation;

  findNextButton() {
    return this.findComponent(`.${styles['next-button']}`, ButtonWrapper)!;
  }

  findPreviousButton() {
    return this.findComponent(`.${styles['previous-button']}`, ButtonWrapper)!;
  }

  findFinishButton() {
    return this.findComponent(`.${styles['finish-button']}`, ButtonWrapper)!;
  }

  findStepCounter() {
    return this.findByClassName(styles['step-counter-content'])!;
  }

  findHeader() {
    return this.findByClassName(styles.header)!;
  }

  findContent() {
    return this.findByClassName(styles.content)!;
  }

  findDismissButton() {
    return this.findComponent(`.${popoverStyles['dismiss-control']}`, ButtonWrapper)!;
  }
}

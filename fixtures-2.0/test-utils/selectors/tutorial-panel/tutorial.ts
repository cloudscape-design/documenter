// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
import ButtonWrapper from '../button';
import { AlertWrapper } from '../index.js';
import LinkWrapper from '../link';
export default class TutorialItemWrapper extends ComponentWrapper {
  static rootSelector: string = styles['tutorial-box'];

  findStartButton() {
    return this.findComponent(`.${styles.start}`, ButtonWrapper);
  }

  findLearnMoreLink() {
    return this.findComponent(`.${styles['learn-more-link']}`, LinkWrapper);
  }

  findExpandButton() {
    return this.findComponent(`.${styles['expand-button']}`, ButtonWrapper);
  }

  findCollapseButton() {
    return this.findComponent(`.${styles['collapse-button']}`, ButtonWrapper);
  }

  findDescription() {
    return this.findByClassName(styles['tutorial-description']);
  }

  findTitle() {
    return this.findByClassName(styles.title)!;
  }

  findCompleted() {
    return this.findByClassName(styles.completed);
  }

  findPrerequisitesAlert() {
    return this.findComponent(`.${styles['prerequisites-alert']}`, AlertWrapper);
  }
}

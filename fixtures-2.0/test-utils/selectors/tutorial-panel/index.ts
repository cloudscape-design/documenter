// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
const listStyles: any = {};
const detailStyles: any = {};
import LinkWrapper from '../link';
import TutorialItemWrapper from './tutorial';
import ButtonWrapper from '../button';
import ExpandableSectionWrapper from '../expandable-section';
export default class TutorialPanelWrapper extends ComponentWrapper {
  static rootSelector: string = styles['tutorial-panel'];

  findTutorials() {
    return this.findAllByClassName(listStyles['tutorial-box']).map(item => new TutorialItemWrapper(item.getElement()));
  }

  findDownloadLink() {
    return this.findComponent(`.${listStyles['download-link']}`, LinkWrapper);
  }

  findTaskList() {
    return this.findAllByClassName(detailStyles.task).map(item => new TutorialTaskWrapper(item.getElement()));
  }

  findDismissButton() {
    return this.findComponent(`.${detailStyles['dismiss-button']}`, ButtonWrapper);
  }

  findCompletionScreenTitle() {
    return this.findByClassName(detailStyles['completion-screen-title']);
  }

  findCompletionScreenDescription() {
    return this.findByClassName(detailStyles['completion-screen-description']);
  }

  findFeedbackLink() {
    return this.findComponent(`.${detailStyles['feedback-link']}`, LinkWrapper);
  }
}

class TutorialTaskWrapper extends ComponentWrapper {
  findTitle() {
    return this.findByClassName(detailStyles['task-title'])!;
  }

  findStepsTitle() {
    return this.findComponent(`.${detailStyles['expandable-section-wrapper']}`, ExpandableSectionWrapper)!.findHeader();
  }

  findSteps() {
    return this.findAllByClassName(detailStyles['step-title']);
  }
}

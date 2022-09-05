// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import ButtonWrapper from '../button';
const styles: any = {};
const popoverStyles: any = {};
export default class ChartPopoverWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findHeader() {
    return this.findByClassName(popoverStyles.header);
  }

  findContent() {
    return this.findByClassName(popoverStyles.content);
  }

  findDismissButton() {
    return this.findComponent(`.${popoverStyles['dismiss-control']}`, ButtonWrapper);
  }
}

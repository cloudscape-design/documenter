// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
import ButtonWrapper from '../button';
const styles: any = {};
const popoverStyles: any = {};

export default class ChartPopoverWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findHeader(): ElementWrapper | null {
    return this.findByClassName(popoverStyles.header);
  }

  findContent(): ElementWrapper | null {
    return this.findByClassName(popoverStyles.content);
  }

  findDismissButton(): ButtonWrapper | null {
    return this.findComponent(`.${popoverStyles['dismiss-control']}`, ButtonWrapper);
  }
}

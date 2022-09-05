// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import ToggleWrapper from '../toggle';
const styles: any = {};

const getClassName = (suffix: string): string => styles[`visible-content-${suffix}`];

export default class VisibleContentPreferenceWrapper extends ComponentWrapper {
  static rootSelector = styles['visible-content'];

  findTitle() {
    return this.findByClassName(getClassName('title'))!;
  }

  findOptionsGroups() {
    return this.findAllByClassName(getClassName('group'));
  }

  findOptions() {
    return this.findAllByClassName(getClassName('option'));
  }
  /**
   * Returns a content selector toggle.
   *
   * @param groupIndex 1-based index of the content group.
   * @param optionIndex 1-based index of the option to return within the group.
   */

  findToggleByIndex(groupIndex: number, optionIndex: number) {
    const groupSelector = `.${getClassName('groups')} > *:nth-child(${groupIndex})`;
    const optionSelector = `.${getClassName('option')}:nth-child(${optionIndex})`;
    return this.findComponent(`${groupSelector} ${optionSelector} .${getClassName('toggle')}`, ToggleWrapper);
  }
}

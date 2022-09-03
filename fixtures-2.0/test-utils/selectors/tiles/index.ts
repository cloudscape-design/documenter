// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper, ComponentWrapper } from '@cloudscape-design/test-utils-core/selectors';
import { escapeSelector } from '@cloudscape-design/test-utils-core/utils';
import TileWrapper from './tile';
const styles: any = {};
export default class TilesWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findItems() {
    return this.findAllByClassName(styles['tile-container']).map(r => new TileWrapper(r.getElement()));
  }

  findInputByValue(value: string) {
    const safeValue = escapeSelector(value);
    return this.find(`input[value="${safeValue}"]`);
  }

  findItemByValue(value: string) {
    const toReplace = escapeSelector(value);
    return this.findComponent(`.${TileWrapper.rootSelector}[data-value="${toReplace}"]`, TileWrapper);
  }
}

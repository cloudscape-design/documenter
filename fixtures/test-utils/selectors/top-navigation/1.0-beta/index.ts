// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import LinkWrapper from '../../link';
import ButtonWrapper from '../../button';
import ButtonDropdownWrapper from '../../button-dropdown';
const styles: any = {};
const buttonDropdownStyles: any = {};
const menuDropdownStyles: any = {};
export default class TopNavigationWrapper extends ComponentWrapper {
  static rootSelector = `${styles['top-navigation']}:not(.${styles.hidden})`;

  findIdentityLink() {
    return this.find(`.${styles.identity} a`)!;
  }

  findLogo() {
    return this.find(`.${styles.logo}`);
  }

  findTitle() {
    return this.find(`.${styles.title}`);
  }

  findSearch() {
    return this.find(`.${styles.search}`);
  }

  findUtilities() {
    return this.findAll(`.${styles['utility-wrapper']}[data-utility-index]`).map(
      i => new TopNavigationUtilityWrapper(i.getElement())
    );
  }

  findUtility(index: number) {
    return this.findComponent(
      `.${styles['utility-wrapper']}[data-utility-index="${index - 1}"]`,
      TopNavigationUtilityWrapper
    );
  }

  findSearchButton() {
    return this.find(`.${styles['utility-wrapper']}[data-utility-special="search"] a`);
  }

  findOverflowMenuButtonDropdown() {
    return this.findComponent(`.${styles.trigger}`, MenuDropdownWrapper);
  }
}
export class MenuDropdownWrapper extends ButtonDropdownWrapper {
  findNativeButton() {
    // ButtonDropdown always has a button
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.find(`button.${menuDropdownStyles.button}`)!;
  }
}
export class TopNavigationUtilityWrapper extends ComponentWrapper {
  findButtonLinkType() {
    return this.findComponent(`.${LinkWrapper.rootSelector}`, LinkWrapper);
  }

  findPrimaryButtonType() {
    return this.findComponent(`.${ButtonWrapper.rootSelector}`, ButtonWrapper);
  }

  findMenuDropdownType() {
    return this.findComponent(`.${ButtonDropdownWrapper.rootSelector}`, TopNavigationMenuDropdownWrapper);
  }
}
export class TopNavigationMenuDropdownWrapper extends ButtonDropdownWrapper {
  findNativeButton() {
    return this.find(`.${menuDropdownStyles.button}`)!;
  }

  findTitle() {
    return this.findByClassName(buttonDropdownStyles.title);
  }

  findDescription() {
    return this.findByClassName(buttonDropdownStyles.description);
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, createWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import LinkWrapper from '../link';
import ButtonWrapper from '../button';
import ButtonDropdownWrapper from '../button-dropdown';
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

  findOverflowMenuButton() {
    return this.findComponent(`[data-utility-special="menu-trigger"] > button`, ButtonWrapper);
  }

  findOverflowMenu() {
    return createWrapper().findComponent(`.${styles['overflow-menu-drawer']}`, OverflowMenu);
  }
}
export class OverflowMenu extends ComponentWrapper {
  findDismissButton() {
    return this.findByClassName(styles['overflow-menu-dismiss-button']);
  }

  findBackButton() {
    return this.findByClassName(styles['overflow-menu-back-button']);
  }

  findTitle() {
    return this.findByClassName(styles['overflow-menu-header-text--title']);
  }

  findDescription() {
    return this.findByClassName(styles['overflow-menu-header-text--secondary']);
  }

  findUtility(index: number) {
    return this.find(`[data-testid="__${index - 1}"]`);
  }

  findMenuDropdownItemById(id: string) {
    return this.find(`[data-testid="${id}"]`);
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

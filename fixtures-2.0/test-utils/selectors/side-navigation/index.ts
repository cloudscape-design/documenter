// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import ExpandableSectionWrapper from '../expandable-section';
const styles: any = {};
export default class SideNavigationWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  findHeaderLink() {
    return this.findByClassName(styles['header-link']);
  }

  findLinkByHref(href: string) {
    return this.find(`.${styles.link}[href="${href}"]`);
  }

  findActiveLink() {
    return this.findByClassName(styles['link-active']);
  }

  findItemByIndex(index: number) {
    return this.findComponent(`.${styles['list-variant-root']} > li:nth-child(${index})`, SideNavigationItemWrapper);
  }
}
export class SideNavigationItemWrapper extends ElementWrapper {
  findSection() {
    return this.findComponent(`.${styles.section}`, ExpandableSectionWrapper);
  }

  findExpandableLinkGroup() {
    return this.findComponent(`.${styles['expandable-link-group']}`, ExpandableSectionWrapper);
  }

  findDivider() {
    return this.findByClassName(styles.divider);
  }

  findLink() {
    return this.findByClassName(styles.link);
  }

  findSectionTitle() {
    return this.findSection()?.findHeader() ?? null;
  }

  findItemByIndex(index: number) {
    return this.findComponent(`li:nth-child(${index})`, SideNavigationItemWrapper);
  }

  findItems() {
    return this.findAll('li').map(wrapper => new SideNavigationItemWrapper(wrapper.getElement()));
  }
}

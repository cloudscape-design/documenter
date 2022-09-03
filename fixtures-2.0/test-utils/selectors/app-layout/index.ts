// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import SplitPanelWrapper from '../split-panel';
const testutilStyles: any = {};
export default class AppLayoutWrapper extends ComponentWrapper {
  static rootSelector = testutilStyles.root;

  findNavigation() {
    return this.findByClassName(testutilStyles.navigation)!;
  }

  findNavigationToggle() {
    return this.findByClassName(testutilStyles['navigation-toggle'])!;
  }

  findNavigationClose() {
    return this.findByClassName(testutilStyles['navigation-close'])!;
  }

  findContentRegion() {
    return this.findByClassName(testutilStyles.content)!;
  }

  findNotifications() {
    return this.findByClassName(testutilStyles.notifications);
  }

  findBreadcrumbs() {
    return this.findByClassName(testutilStyles.breadcrumbs);
  }

  findTools() {
    return this.findByClassName(testutilStyles.tools)!;
  }

  findToolsClose() {
    return this.findByClassName(testutilStyles['tools-close'])!;
  }

  findToolsToggle() {
    return this.findByClassName(testutilStyles['tools-toggle'])!;
  }

  findSplitPanel() {
    return this.findComponent(`.${SplitPanelWrapper.rootSelector}`, SplitPanelWrapper);
  }
}

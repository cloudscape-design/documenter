// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
import AutosuggestWrapper from '../autosuggest';
import FilteringTokenWrapper from '../internal/filtering-token';
export default class PropertyFilterWrapper extends AutosuggestWrapper {
  static rootSelector = styles.root;

  findResultsCount() {
    return this.findByClassName(styles.results)!;
  }

  findTokens() {
    return this.findAllByClassName(FilteringTokenWrapper.rootSelector).map(
      (elementWrapper: ElementWrapper) => new FilteringTokenWrapper(elementWrapper.getElement())
    );
  }
  /**
   * Returns the button that toggles if the tokens above `tokenLimit` are visible.
   */

  findTokenToggle() {
    return this.findByClassName(styles['toggle-collapsed']);
  }
  /**
   * Returns the button that removes all current tokens.
   */

  findRemoveAllButton() {
    return this.findByClassName(styles['remove-all']);
  }
}

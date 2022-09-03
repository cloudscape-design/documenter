// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act } from 'react-dom/test-utils';
import { ComponentWrapper, ElementWrapper, createWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
const dropdownStyles: any = {};
const itemStyles: any = {};
const categoryStyles: any = {};
const buttonStyles: any = {};
export default class ButtonDropdownWrapper extends ComponentWrapper {
  static rootSelector: string = styles['button-dropdown'];

  findNativeButton() {
    // ButtonDropdown always has a button
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.find(`button.${buttonStyles.button}`)!;
  }

  findOpenDropdown() {
    return createWrapper().find(`.${dropdownStyles.dropdown}[data-open=true]`);
  }
  /**
   * Finds an item in the open dropdown by item id. Returns null if there is no open dropdown.
   *
   * This utility does not open the dropdown. To find dropdown items, call `openDropdown()` first.
   */

  findItemById(id: string) {
    const itemSelector = `.${itemStyles['item-element']}[data-testid="${id}"]`;
    return this.findOpenDropdown()?.find(itemSelector) || this.find(itemSelector);
  }
  /**
   * Finds an expandable category in the open dropdown by category id. Returns null if there is no open dropdown.
   *
   * This utility does not open the dropdown. To find dropdown items, call `openDropdown()` first.
   */

  findExpandableCategoryById(id: string) {
    const expandableCategorySelector = `.${categoryStyles.expandable}[data-testid="${id}"]`;
    return this.findOpenDropdown()?.find(expandableCategorySelector) || this.find(expandableCategorySelector);
  }
  /**
   * Finds the highlighted item in the open dropdown. Returns null if there is no open dropdown.
   *
   * This utility does not open the dropdown. To find dropdown items, call `openDropdown()` first.
   */

  findHighlightedItem() {
    const highlightedItemSelector = `.${itemStyles['item-element']}.${itemStyles.highlighted}`;
    return this.findOpenDropdown()?.find(highlightedItemSelector) || this.find(highlightedItemSelector);
  }
  /**
   * Finds all the items in the open dropdown. Returns empty array if there is no open dropdown.
   *
   * This utility does not open the dropdown. To find dropdown items, call `openDropdown()` first.
   */

  findItems() {
    return this.findOpenDropdown()?.findAll(`.${itemStyles['item-element']}`) || [];
  }
  /**
   * Finds the disabled reason tooltip. Returns null if no disabled item with `disabledReason` is highlighted.
   */

  findDisabledReason() {
    return createWrapper().find(`[data-testid="button-dropdown-disabled-reason"]`);
  }
}

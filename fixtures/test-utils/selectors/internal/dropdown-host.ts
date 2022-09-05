// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act } from 'react-dom/test-utils';
import { ComponentWrapper, ElementWrapper, createWrapper } from '@cloudscape-design/test-utils-core/selectors';
import { escapeSelector } from '@cloudscape-design/test-utils-core/utils';
import DropdownWrapper from './dropdown';
import OptionsListWrapper from './options-list';
import OptionWrapper from './option';
const selectableStyles: any = {};
const dropdownStyles: any = {};
const footerStyles: any = {};
const optionStyles: any = {};
export default abstract class DropdownHostComponentWrapper extends ComponentWrapper {
  abstract findTrigger(): ElementWrapper;
  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */

  private assertOpenDropdown(
    options = {
      expandToViewport: false,
    }
  ) {
    const isOpen = !!this.findDropdown(options)?.findOpenDropdown();

    if (!isOpen) {
      throw new Error('Unable to select an option when dropdown is closed');
    }
  }
  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */

  findDropdown(
    options = {
      expandToViewport: false,
    }
  ) {
    return options.expandToViewport
      ? createWrapper().findComponent(`.${dropdownStyles.dropdown}[data-open=true]`, PortalDropdownContentWrapper)!
      : new DropdownContentWrapper(this.getElement());
  }
}
export class DropdownContentWrapper extends ComponentWrapper {
  findDisabledOptions() {
    return this.findAllByClassName(selectableStyles.disabled).map(
      (elementWrapper: ElementWrapper) => new OptionWrapper(elementWrapper.getElement())
    );
  }

  findFooterRegion() {
    return this.findByClassName(footerStyles.root);
  }

  findHighlightedAriaLiveRegion() {
    return this.find('[aria-live]');
  }
  /**
   * Returns highlighted text fragments from all of the options.
   * Options get highlighted when they match the value of the input field.
   */

  findHighlightedMatches() {
    return this.findAllByClassName(optionStyles['filtering-match-highlight']);
  }

  findHighlightedOption() {
    return this.findComponent(`.${selectableStyles.highlighted}`, OptionWrapper);
  }

  findOpenDropdown() {
    const dropdown = new DropdownWrapper(this.getElement());
    return dropdown.findOpenDropdown();
  }
  /**
   * Returns an option from the dropdown.
   *
   * @param optionIndex 1-based index of the option to select.
   */

  findOption(optionIndex: number) {
    return this.findComponent(
      `.${selectableStyles['selectable-item']}[data-test-index="${optionIndex}"] .${OptionWrapper.rootSelector}`,
      OptionWrapper
    );
  }

  findOptionByValue(value: string) {
    const toReplace = escapeSelector(value);
    return this.findComponent(`.${OptionWrapper.rootSelector}[data-value="${toReplace}"]`, OptionWrapper);
  }
  /**
   * Returns an option from the dropdown.
   *
   * @param groupIndex 1-based index of the group to select an option in.
   * @param optionIndex 1-based index of the option to select.
   */

  findOptionInGroup(groupIndex: number, optionIndex: number) {
    return this.findComponent(
      `.${selectableStyles['selectable-item']}[data-group-index="${groupIndex}"][data-child-index="${optionIndex}"] .${OptionWrapper.rootSelector}`,
      OptionWrapper
    );
  }

  findOptions() {
    return this.findAll(`.${selectableStyles['selectable-item']}[data-test-index] .${OptionWrapper.rootSelector}`).map(
      (elementWrapper: ElementWrapper) => new OptionWrapper(elementWrapper.getElement())
    );
  }
  /**
   * Use this element to scroll through the list of options
   */

  findOptionsContainer() {
    return this.findByClassName(OptionsListWrapper.rootSelector);
  }

  findSelectedOptions() {
    return this.findAllByClassName(selectableStyles.selected).map(
      (elementWrapper: ElementWrapper) => new OptionWrapper(elementWrapper.getElement())
    );
  }
}
export class PortalDropdownContentWrapper extends DropdownContentWrapper {
  findOpenDropdown() {
    return createWrapper().findComponent(`.${dropdownStyles.dropdown}[data-open=true]`, DropdownWrapper);
  }
}

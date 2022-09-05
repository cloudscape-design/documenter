// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act } from 'react-dom/test-utils';
import { ElementWrapper, ComponentWrapper, usesDom, createWrapper } from '@cloudscape-design/test-utils-core/dom';
import InputWrapper from '../input';

import { escapeSelector } from '@cloudscape-design/test-utils-core/utils';
import OptionWrapper from '../internal/option';
import OptionsListWrapper from '../internal/options-list';
import DropdownWrapper from '../internal/dropdown';

const mainStyles: any = {};
const dropdownStatusStyles: any = {};
const selectableStyles: any = {};
const footerStyles: any = {};
const optionStyles: any = {};
const dropdownStyles: any = {};

export class AutosuggestDropdownWrapper extends ComponentWrapper {
  findOptions(): Array<OptionWrapper> {
    return this.findAll(`.${selectableStyles['selectable-item']}[data-test-index]`).map(
      (elementWrapper: ElementWrapper) => new OptionWrapper(elementWrapper.getElement())
    );
  }

  /**
   * Returns an option from the dropdown.
   *
   * @param optionIndex 1-based index of the option to select.
   */
  findOption(optionIndex: number): OptionWrapper | null {
    return this.findComponent(
      `.${selectableStyles['selectable-item']}[data-test-index="${optionIndex}"]`,
      OptionWrapper
    );
  }

  /**
   * Returns an option from the autosuggest by it's value
   *
   * @param value The 'value' of the option.
   */
  findOptionByValue(value: string): OptionWrapper | null {
    const toReplace = escapeSelector(value);
    return this.findComponent(`.${OptionWrapper.rootSelector}[data-value="${toReplace}"]`, OptionWrapper);
  }

  /**
   * Returns an option from the dropdown.
   *
   * @param groupIndex 1-based index of the group to select an option in.
   * @param optionIndex 1-based index of the option to select.
   */
  findOptionInGroup(groupIndex: number, optionIndex: number): OptionWrapper | null {
    return this.findComponent(
      `.${selectableStyles['selectable-item']}[data-group-index="${groupIndex}"][data-in-group-index="${optionIndex}"]`,
      OptionWrapper
    );
  }

  /**
   * Use this element to scroll through the list of options
   */
  findOptionsContainer(): ElementWrapper | null {
    return this.findByClassName(OptionsListWrapper.rootSelector);
  }

  findFooterRegion(): ElementWrapper | null {
    return this.findByClassName(footerStyles.root);
  }

  findOpenDropdown(): ElementWrapper | null {
    // Autosuggest always has a dropdown
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dropdown = new DropdownWrapper(this.getElement());
    return dropdown.findOpenDropdown();
  }

  findHighlightedOption(): OptionWrapper | null {
    return this.findComponent(`.${selectableStyles.highlighted}`, OptionWrapper);
  }

  /**
   * Returns all the selected options.
   */
  findDisabledOptions(): Array<OptionWrapper> {
    return this.findAllByClassName(selectableStyles.disabled).map(
      (elementWrapper: ElementWrapper) => new OptionWrapper(elementWrapper.getElement())
    );
  }

  /**
   * Returns highlighted text fragments from all of the options.
   * Options get highlighted when they match the value of the input field.
   */
  findHighlightedMatches(): Array<ElementWrapper> {
    return this.findAllByClassName(optionStyles['filtering-match-highlight']);
  }

  findHighlightedAriaLiveRegion(): ElementWrapper | null {
    return this.find('[aria-live]');
  }
}

export class PortalAutosuggestDropdownWrapper extends AutosuggestDropdownWrapper {
  findOpenDropdown(): ElementWrapper | null {
    return createWrapper().find(`.${dropdownStyles.dropdown}[data-open=true]`);
  }
}

export default class AutosuggestWrapper extends InputWrapper {
  static rootSelector: string = mainStyles.root;

  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */
  findDropdown(options = { expandToViewport: false }): AutosuggestDropdownWrapper {
    return options.expandToViewport
      ? createWrapper().findComponent(`.${dropdownStyles.dropdown}[data-open=true]`, PortalAutosuggestDropdownWrapper)!
      : new AutosuggestDropdownWrapper(this.getElement());
  }

  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */
  findStatusIndicator(options = { expandToViewport: false }): ElementWrapper | null {
    return this.findDropdown(options).findByClassName(dropdownStatusStyles.root);
  }

  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */
  findErrorRecoveryButton(options = { expandToViewport: false }): ElementWrapper | null {
    return this.findDropdown(options).findByClassName(footerStyles.recovery);
  }

  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */
  findEnteredTextOption(options = { expandToViewport: false }): ElementWrapper | null {
    return this.findDropdown(options).findByClassName(selectableStyles['has-background']);
  }

  /**
   * Selects a suggestion from the dropdown by simulating mouse events.
   *
   * @param index 1-based index of the suggestion to select.
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */
  @usesDom
  selectSuggestion(index: number, options = { expandToViewport: false }): void {
    act(() => {
      this.findDropdown(options)
        ?.findOption(index)!
        .fireEvent(new MouseEvent('mouseup', { bubbles: true }));
    });
  }

  /**
   * Selects a suggestion from the dropdown by simulating mouse events.
   *
   * @param value value of suggestion to select
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */
  @usesDom
  selectSuggestionByValue(value: string, options = { expandToViewport: false }): void {
    act(() => {
      this.findDropdown(options)
        ?.findOptionByValue(value)!
        .fireEvent(new MouseEvent('mouseup', { bubbles: true }));
    });
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act } from 'react-dom/test-utils';
import { ComponentWrapper, ElementWrapper, createWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
const dayStyles: any = {};
const relativeRangeStyles: any = {};
import SelectWrapper from '../select';
import ButtonWrapper from '../button';
import RadioGroupWrapper from '../radio-group';
import InputWrapper from '../input';
import SegmentedControlWrapper from '../segmented-control';
export default class DateRangePickerWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;
  /**
   * Alias for `findTrigger`
   * @deprecated
   */

  findLabel() {
    return this.findTrigger();
  }
  /**
   * Returns the trigger element that can be used to open the picker dropdown.
   */

  findTrigger() {
    return this.findByClassName(styles.label)!;
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
    const wrapper = options.expandToViewport ? createWrapper() : this;
    return wrapper.findComponent(`.${styles.dropdown}`, DrpDropdownWrapper);
  }
}
export class SelectionModeSwitchWrapper extends ElementWrapper {
  /**
   * Returns the mode selector as a SegmentedControl wrapper.
   *
   * The mode selector is only rendered as a SegmentedControl on wide viewports. On narrow viewports, use `findModesAsSelect()` instead.
   */
  findModesAsSegments() {
    return new SegmentedControlWrapper(this.getElement());
  }
  /**
   * Returns the mode selector as a Select wrapper.
   * The mode selector is only rendered as a Select on narrow viewports. On wide viewports, use `findModesAsSegments()` instead.
   */

  findModesAsSelect() {
    return new SelectWrapper(this.getElement());
  }
}
export class DrpDropdownWrapper extends ComponentWrapper {
  findSelectionModeSwitch() {
    return this.findComponent(`.${styles['mode-switch']}`, SelectionModeSwitchWrapper)!;
  }

  findValidationError() {
    return this.findByClassName(styles['validation-error']);
  } // -- Relative mode --

  findRelativeRangeRadioGroup() {
    return this.findComponent(`.${relativeRangeStyles['relative-range-radio-group']}`, RadioGroupWrapper);
  }

  findCustomRelativeRangeDuration() {
    return this.findComponent(`.${relativeRangeStyles['custom-range-duration-input']}`, InputWrapper);
  }

  findCustomRelativeRangeUnit() {
    return this.findComponent(`.${relativeRangeStyles['custom-range-unit-select']}`, SelectWrapper);
  } // -- Absolute mode --

  findHeader() {
    return this.findByClassName(styles['calendar-header'])!;
  }

  findPreviousMonthButton() {
    return this.findComponent(`.${styles['calendar-prev-month-btn']}`, ButtonWrapper)!;
  }

  findNextMonthButton() {
    return this.findComponent(`.${styles['calendar-next-month-btn']}`, ButtonWrapper)!;
  }
  /**
   * Returns a day container on the calendar.
   *
   * @param grid the calendar grid. If only one calendar grid is visible (on small screens), use `'right'`.
   * @param row 1-based row index of the day.
   * @param column 1-based column index of the day.
   */

  findDateAt(grid: 'left' | 'right', row: 1 | 2 | 3 | 4 | 5 | 6, column: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    const gridClassName = grid === 'right' ? styles['second-grid'] : styles['first-grid'];
    return this.find(
      `.${gridClassName} .${styles['calendar-week']}:nth-child(${row}) .${dayStyles.day}:nth-child(${column})`
    )!;
  }

  findSelectedStartDate() {
    return this.findByClassName(dayStyles['start-date']);
  }

  findSelectedEndDate() {
    return this.findByClassName(dayStyles['end-date']);
  }

  findStartDateInput() {
    return this.findComponent(`.${styles['start-date-input']}`, InputWrapper);
  }

  findStartTimeInput() {
    return this.findComponent(`.${styles['start-time-input']}`, InputWrapper);
  }

  findEndDateInput() {
    return this.findComponent(`.${styles['end-date-input']}`, InputWrapper);
  }

  findEndTimeInput() {
    return this.findComponent(`.${styles['end-time-input']}`, InputWrapper);
  } // -- Footer --

  findClearButton() {
    return this.findComponent(`.${styles['clear-button']}`, ButtonWrapper);
  }

  findCancelButton() {
    return this.findComponent(`.${styles['cancel-button']}`, ButtonWrapper)!;
  }

  findApplyButton() {
    return this.findComponent(`.${styles['apply-button']}`, ButtonWrapper)!;
  }
}

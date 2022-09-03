// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper, createWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
import ButtonWrapper from '../button';
import BaseInputWrapper from '../input/base-input';
import DropdownWrapper from '../internal/dropdown';
export default class DatePickerWrapper extends BaseInputWrapper {
  static rootSelector: string = styles.root;
  /**
   * @param options
   * * expandToViewport (boolean) - Use this when the component under test is rendered with an `expandToViewport` flag.
   */

  findCalendar(
    options = {
      expandToViewport: false,
    }
  ) {
    const wrapper = options.expandToViewport ? createWrapper() : this;
    return wrapper.findComponent(`.${styles.calendar}`, CalendarWrapper);
  }

  findCalendarDropdown() {
    const dropdown = new DropdownWrapper(this.getElement());
    return dropdown.findOpenDropdown();
  }

  findOpenCalendarButton() {
    return this.findComponent(`.${styles['open-calendar-button']}`, ButtonWrapper)!;
  }
  /**
   * Sets the value of the component and calls the `onChange` handler.
   * The value needs to use the "YYYY/MM/DD" format,
   * but the subsequent `onChange` handler will contain the value in the "YYYY-MM-DD" format.
   *
   * @param value The value the input is set to, using the "YYYY/MM/DD" format.
   */
}
export class CalendarWrapper extends ComponentWrapper {
  /**
   * Returns a day container on the calendar.
   *
   * @param row 1-based row index of the day.
   * @param column 1-based column index of the day.
   */
  findDateAt(row: number, column: number) {
    return this.find(`.${styles['calendar-week']}:nth-child(${row}) .${styles['calendar-day']}:nth-child(${column})`)!;
  }

  findHeader() {
    return this.findByClassName(styles['calendar-header'])!;
  }

  findPreviousMonthButton() {
    return this.findComponent(`.${styles['calendar-prev-month-btn']}`, ButtonWrapper)!;
  }

  findNextMonthButton() {
    return this.findComponent(`.${styles['calendar-next-month-btn']}`, ButtonWrapper)!;
  }

  findSelectedDate() {
    return this.find(`.${styles['calendar-day-selected']}`)!;
  }
}

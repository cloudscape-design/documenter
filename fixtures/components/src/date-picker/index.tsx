// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { Ref } from 'react';
import { DatePickerProps } from './interfaces';

export { DatePickerProps };

const DatePicker = React.forwardRef(
  (
    {
      locale = '',
      startOfWeek,
      isDateEnabled,
      nextMonthAriaLabel,
      previousMonthAriaLabel,
      todayAriaLabel,
      placeholder = '',
      value = '',
      readOnly = false,
      disabled = false,
      onBlur,
      autoFocus = false,
      onChange,
      onFocus,
      name,
      ariaLabel,
      ariaRequired,
      ariaLabelledby,
      ariaDescribedby,
      controlId,
      invalid,
      openCalendarAriaLabel,
      expandToViewport,
      ...rest
    }: DatePickerProps,
    ref: Ref<DatePickerProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default DatePicker;

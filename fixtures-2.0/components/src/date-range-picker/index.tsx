// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { Ref } from 'react';
import { DateRangePickerProps } from './interfaces';

export { DateRangePickerProps };

const DateRangePicker = React.forwardRef(
  (
    {
      locale = '',
      startOfWeek,
      isDateEnabled = () => true,
      value,
      placeholder,
      readOnly = false,
      disabled = false,
      onChange,
      onBlur,
      onFocus,
      relativeOptions = [],
      i18nStrings,
      isValidRange = () => ({ valid: true }),
      showClearButton = true,
      dateOnly = false,
      timeOffset,
      timeInputFormat = 'hh:mm:ss',
      expandToViewport = false,
      rangeSelectorMode = 'default',
      ...rest
    }: DateRangePickerProps,
    ref: Ref<DateRangePickerProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default DateRangePicker;

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { Ref } from 'react';
import { TimeInputProps } from './interfaces';

export { TimeInputProps };

const TimeInput = React.forwardRef(
  (
    { format = 'hh:mm:ss', use24Hour = true, autoComplete = true, ...props }: TimeInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    // impl
    return null;
  }
);

export default TimeInput;

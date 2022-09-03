// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SelectProps } from './interfaces';

export { SelectProps };

const Select = React.forwardRef(
  (
    {
      options = [],
      filteringType = 'none',
      statusType = 'finished',
      triggerVariant = 'label',
      ...restProps
    }: SelectProps,
    ref: React.Ref<SelectProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default Select;

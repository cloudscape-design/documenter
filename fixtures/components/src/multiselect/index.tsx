// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { MultiselectForwardRefType, MultiselectProps } from './interfaces';

export { MultiselectProps };

const Multiselect = React.forwardRef(
  (
    {
      options = [],
      filteringType = 'none',
      statusType = 'finished',
      selectedOptions = [],
      keepOpen = true,
      hideTokens = false,
      ...restProps
    }: MultiselectProps,
    ref: React.Ref<MultiselectProps.Ref>
  ) => {
    // impl
    return null;
  }
) as MultiselectForwardRefType;

export default Multiselect;

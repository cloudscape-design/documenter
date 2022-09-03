// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { PropertyFilterProps } from './interfaces';

export { PropertyFilterProps };

const PropertyFilter = React.forwardRef(
  (
    {
      disabled,
      i18nStrings,
      countText,
      query,
      hideOperations,
      onChange,
      filteringProperties,
      filteringOptions,
      customGroupsText,
      disableFreeTextFiltering = false,
      onLoadItems,
      virtualScroll,
      customControl,
      filteringEmpty,
      filteringLoadingText,
      filteringFinishedText,
      filteringErrorText,
      filteringRecoveryText,
      filteringStatusType,
      asyncProperties,
      tokenLimit,
      expandToViewport,
      ...rest
    }: PropertyFilterProps,
    ref: React.Ref<PropertyFilterProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default PropertyFilter;

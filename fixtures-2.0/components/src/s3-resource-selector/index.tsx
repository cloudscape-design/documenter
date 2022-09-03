// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { S3ResourceSelectorProps } from './interfaces';

export { S3ResourceSelectorProps };

const S3ResourceSelector = React.forwardRef(
  (
    {
      i18nStrings,
      alert,
      resource,
      viewHref,
      invalid,
      selectableItemsTypes = [],
      inputAriaDescribedby,
      bucketsVisibleColumns = ['Name', 'CreationDate'],
      bucketsIsItemDisabled,
      fetchBuckets,
      fetchObjects,
      objectsVisibleColumns = ['Key', 'LastModified', 'Size'],
      objectsIsItemDisabled,
      fetchVersions,
      versionsVisibleColumns = ['ID', 'LastModified', 'Size'],
      versionsIsItemDisabled,
      onChange,
      ...rest
    }: S3ResourceSelectorProps,
    ref: React.Ref<S3ResourceSelectorProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default S3ResourceSelector;

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { ButtonDropdownProps } from './interfaces';

export { ButtonDropdownProps };

const ButtonDropdown = React.forwardRef(
  (
    {
      items,
      variant = 'normal',
      loading = false,
      disabled = false,
      expandableGroups = false,
      expandToViewport = false,
      ariaLabel,
      children,
      onItemClick,
      onItemFollow,
      ...props
    }: ButtonDropdownProps,
    ref: React.Ref<ButtonDropdownProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default ButtonDropdown;

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { ButtonProps } from './interfaces';

export { ButtonProps };

const Button = React.forwardRef(
  (
    {
      children,
      iconName,
      iconAlign = 'left',
      iconUrl,
      iconSvg,
      iconAlt,
      variant = 'normal',
      loading = false,
      disabled = false,
      wrapText = true,
      href,
      target,
      download,
      formAction = 'submit',
      ariaLabel,
      onClick,
      onFollow,
      ...props
    }: ButtonProps,
    ref: React.Ref<ButtonProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default Button;

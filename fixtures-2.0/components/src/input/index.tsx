// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { Ref } from 'react';
import { InputProps } from './interfaces';

export { InputProps };

const Input = React.forwardRef(
  (
    {
      value,
      type = 'text',
      step,
      inputMode,
      autoComplete = true,
      disabled,
      readOnly,
      disableBrowserAutocorrect,
      onKeyDown,
      onKeyUp,
      onChange,
      onBlur,
      onFocus,
      ariaRequired,
      name,
      placeholder,
      autoFocus,
      ariaLabel,
      ...rest
    }: InputProps,
    ref: Ref<InputProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default Input;

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { Ref } from 'react';
import { TextareaProps } from './interfaces';

export { TextareaProps };

const Textarea = React.forwardRef(
  (
    {
      value,
      autoComplete = true,
      disabled,
      readOnly,
      disableBrowserAutocorrect,
      disableBrowserSpellcheck,
      onKeyDown,
      onKeyUp,
      onChange,
      onBlur,
      onFocus,
      ariaRequired,
      name,
      rows,
      placeholder,
      autoFocus,
      ariaLabel,
      ...rest
    }: TextareaProps,
    ref: Ref<TextareaProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default Textarea;

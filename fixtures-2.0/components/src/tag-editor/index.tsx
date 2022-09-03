// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { TagEditorProps } from './interfaces';

export { TagEditorProps };

const TagEditor = React.forwardRef(
  (
    {
      tags = [],
      i18nStrings,
      loading = false,
      tagLimit = 50,
      allowedCharacterPattern,
      keysRequest,
      valuesRequest,
      onChange,
      ...restProps
    }: TagEditorProps,
    ref: React.Ref<TagEditorProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default TagEditor;

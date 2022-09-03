// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { AttributeEditorForwardRefType, AttributeEditorProps } from './interfaces';

export { AttributeEditorProps };

const AttributeEditor = React.forwardRef(
  <T,>(
    { items = [], isItemRemovable = () => true, ...props }: AttributeEditorProps<T>,
    ref: React.Ref<AttributeEditorProps.Ref>
  ) => {
    // impl
    return null;
  }
) as AttributeEditorForwardRefType;

export default AttributeEditor;

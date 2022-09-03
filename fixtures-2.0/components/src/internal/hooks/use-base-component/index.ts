// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { MutableRefObject } from 'react';

export interface InternalBaseComponentProps {
  __internalRootRef?: MutableRefObject<any> | null;
}

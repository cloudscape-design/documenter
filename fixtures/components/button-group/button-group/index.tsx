// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

import { ButtonGroupProps } from './interfaces';

export { ButtonGroupProps };

/**
 * Component-level description
 */
export default function ButtonGroup({ variant, items }: ButtonGroupProps) {
  return <div className={variant}>{items.length}</div>;
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

import { ButtonProps } from './interfaces';

export { ButtonProps };

/**
 * Component-level description
 */
export default function Button({ iconName }: ButtonProps) {
  return <div className={iconName}>{iconName}</div>;
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { DependencyProps } from './interfaces';

export { DependencyProps };

export default function Dependency({ name, variant = 'button' }: DependencyProps) {
  return <div className={variant}>{name}</div>;
}

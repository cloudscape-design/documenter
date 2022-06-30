// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface DependencyProps {
  name?: string;
  variant?: DependencyProps.Variant;
}

// should not be included in the Main component API definition
export interface MainProps {
  randomValue: string;
}

export namespace DependencyProps {
  export type Variant = 'button' | 'link';
}

export default function Dependency({ name, variant = 'button' }: DependencyProps) {
  return <div className={variant}>{name}</div>;
}

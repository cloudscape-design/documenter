// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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

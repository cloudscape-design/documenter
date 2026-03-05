// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

type IconName = 'add-plus' | 'arrow-left' | 'close' | 'search';

export interface IconProviderProps {
  children: React.ReactNode;
  /** Icon overrides */
  icons: IconProviderProps.Icons | null;
}

export namespace IconProviderProps {
  export type Icons = {
    [name in IconName]?: React.ReactNode | null;
  };
}

/**
 * Icon provider component
 */
export default function IconProvider({ children }: IconProviderProps) {
  return <div>{children}</div>;
}

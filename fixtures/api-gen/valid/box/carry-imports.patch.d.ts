// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import type { IconProps } from '@fixtures/upstream/icon';

declare module '@fixtures/upstream/box' {
  export interface BoxProps {
    icon?: IconProps;
  }
}

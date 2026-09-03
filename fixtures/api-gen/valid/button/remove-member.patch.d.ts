// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Remove } from '@cloudscape-design/documenter/api-gen/markers';

declare module '@fixtures/upstream/button' {
  export interface ButtonProps {
    iconName: Remove;
  }
  export namespace ButtonProps {
    export type IconName = Remove;
  }
}

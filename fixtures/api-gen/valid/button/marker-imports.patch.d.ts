// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import type { FutureMarker, Remove as Drop } from '@cloudscape-design/documenter/api-gen/markers';
import * as ApiGen from '@cloudscape-design/documenter/api-gen/markers';

declare module '@fixtures/upstream/button' {
  export interface ButtonProps {
    onClick: Drop;
    iconName: ApiGen.Remove;
  }
}

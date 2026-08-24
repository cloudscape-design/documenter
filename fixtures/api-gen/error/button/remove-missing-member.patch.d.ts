// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import type { Remove } from '@cloudscape-design/documenter/api-gen/markers';

declare module '@fixtures/upstream/button' {
  export namespace ButtonProps {
    type AltText = Remove;
  }
}

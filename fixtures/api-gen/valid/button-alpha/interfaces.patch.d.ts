// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import type { Remove } from '@cloudscape-design/documenter/api-gen/markers';

// Proxies the same upstream component as `valid/button`, at a second place in the proxy tree.
declare module '@fixtures/upstream/button' {
  export interface ButtonProps {
    children: Remove;
  }
}

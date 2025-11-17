// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export class ElementWrapper {}

// this generic type simulates MultiElementWrapper from test-utils-core
export class MultiElementWrapper<T extends ElementWrapper> {
  items: readonly T[] = [];
}

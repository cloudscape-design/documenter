// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ElementWrapper } from './core';

export class AlertWrapper extends ElementWrapper {
  findContent() {
    return new ElementWrapper();
  }
}

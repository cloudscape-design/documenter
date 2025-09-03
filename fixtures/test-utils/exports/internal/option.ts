// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '../core';

export default class OptionWrapper extends ElementWrapper {
  findLabel(): ElementWrapper | null {
    return new ElementWrapper();
  }
}

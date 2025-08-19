// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ElementWrapper } from './core';

class CardWrapper extends ElementWrapper {
  findHeader() {
    return new ElementWrapper();
  }

  findContent() {
    return new ElementWrapper();
  }
}

export class CardsWrapper extends ElementWrapper {
  findItems() {
    return [new CardWrapper(), new CardWrapper()];
  }
}

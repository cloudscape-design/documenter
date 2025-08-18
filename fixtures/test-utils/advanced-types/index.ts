// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export class TestUtilWrapper {
  /**
   * Generic return value
   */
  findAll(): Array<HTMLElement> {
    return [];
  }

  findSomething(): TestUtilWrapper | null {
    return Math.random() > 0.5 ? new TestUtilWrapper() : null;
  }

  /**
   * Generic arguments
   */
  setAll(all: Array<HTMLElement>) {}

  /**
   * Method overload example
   */
  keydown(keyCode: number): void;
  keydown(keyboardEventProps: KeyboardEventInit): void;
  keydown(args: KeyboardEventInit | number) {}
}

export default function createWrapper() {
  return new TestUtilWrapper();
}

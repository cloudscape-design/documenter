// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
interface TestReturnType {
  key: string;
}

export class TestUtilWrapper {
  noOp(): void {}

  /**
   * Finds a string.
   *
   * The function may look trivial but people have been losing their words
   * since centuries.
   */
  findString() {
    return 'Here it is!';
  }

  /**
   * Short Text
   *
   * @param newString
   */
  setString(newString: string) {
    console.log(newString);
  }

  /**
   * Short Text.
   *
   * Long Text.
   */
  public findObject(): TestReturnType {
    return {
      key: 'value',
    };
  }

  // This function should not be included because it's private
  private privateNoOp(): void {}

  // And this function should not be included because it's protected
  protected protectedNoOp(): void {}
}

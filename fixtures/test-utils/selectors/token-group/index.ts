// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const selectors: any = {};
const spaceBetweenSelectors: any = {};
import TokenWrapper from './token';
export default class TokenGroupWrapper extends ComponentWrapper {
  static rootSelector: string = selectors.root;

  findTokens() {
    return this.findAllByClassName(TokenWrapper.rootSelector).map(
      tokenElement => new TokenWrapper(tokenElement.getElement())
    );
  }
  /**
   * Returns a token from the group for a given index.
   *
   * @param tokenIndex 1-based index of the token to return.
   */

  findToken(tokenIndex: number) {
    return this.findComponent(
      `.${spaceBetweenSelectors.child}:nth-child(${tokenIndex}) > .${TokenWrapper.rootSelector}`,
      TokenWrapper
    );
  }
  /**
   * Returns the token toggle button.
   */

  findTokenToggle() {
    return this.findByClassName(selectors.toggle);
  }
}

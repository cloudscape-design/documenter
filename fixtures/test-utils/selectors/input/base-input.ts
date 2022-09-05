// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act, Simulate } from 'react-dom/test-utils';
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const inputSelectors: any = {};
export default abstract class BaseInputWrapper extends ComponentWrapper {
  findNativeInput() {
    // Input component always have native input
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.find(`.${inputSelectors.input}`)!;
  }
}

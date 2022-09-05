// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper } from '@cloudscape-design/test-utils-core/selectors';
const styles: any = {};
export default class TextContentWrapper extends ComponentWrapper {
  static rootSelector: string = styles['text-content'];
}

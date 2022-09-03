// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper } from '@cloudscape-design/test-utils-core/dom';
const styles: any = {};

export default class SpinnerWrapper extends ComponentWrapper<HTMLButtonElement> {
  static rootSelector: string = styles.root;
}

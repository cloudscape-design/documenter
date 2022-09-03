// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { TabsProps } from './interfaces';

export { TabsProps };

export default function Tabs({
  tabs,
  variant = 'default',
  onChange,
  activeTabId: controlledTabId,
  ariaLabel,
  ariaLabelledby,
  disableContentPaddings = false,
  ...rest
}: TabsProps) {
  // impl
}

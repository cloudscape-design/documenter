// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { PopoverProps } from './interfaces';

export { PopoverProps };

export default function Popover({
  position = 'right',
  size = 'medium',
  fixedWidth = false,
  triggerType = 'text',
  dismissButton = true,
  renderWithPortal = false,
  ...rest
}: PopoverProps) {
  // impl
}

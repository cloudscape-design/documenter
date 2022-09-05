// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { HotspotProps } from './interfaces';

export { HotspotProps };

export default function Hotspot({
  children,
  hotspotId,
  side = 'right',
  direction = 'top',
  ...restProps
}: HotspotProps): JSX.Element {
  // impl
  return <></>;
}

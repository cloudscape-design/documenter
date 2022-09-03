// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export type Breakpoint = 'default' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';

const BREAKPOINT_MAPPING: [Breakpoint, number][] = [
  ['xl', 1840],
  ['l', 1320],
  ['m', 1120],
  ['s', 912],
  ['xs', 688],
  ['xxs', 465],
  ['default', -1],
];

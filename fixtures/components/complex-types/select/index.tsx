// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { SelectProps } from './interfaces';

export interface BaseOption {
  label?: string;
  disabled?: boolean;
}

export interface OptionDefinition extends BaseOption {
  value?: string;
  labelTag?: string;
  description?: string;
  iconAlt?: string;
  iconUrl?: string;
  iconSvg?: React.ReactNode;
  tags?: ReadonlyArray<string>;
  filteringTags?: ReadonlyArray<string>;
  __labelPrefix?: string;
}
export interface SelectProps {
  href: string;
  selectedOption: OptionDefinition | string;
}

export default function Select(props: SelectProps) {
  return <div>Select!!!!</div>;
}

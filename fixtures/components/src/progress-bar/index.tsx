// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ProgressBarProps } from './interfaces';

export { ProgressBarProps };

export default function ProgressBar({
  value = 0,
  status = 'in-progress',
  variant = 'standalone',
  resultButtonText,
  label,
  description,
  additionalInfo,
  resultText,
  onResultButtonClick,
  ...rest
}: ProgressBarProps) {
  // impl
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CollectionPreferencesProps } from './interfaces';

export { CollectionPreferencesProps };

export default function CollectionPreferences({
  title,
  confirmLabel,
  cancelLabel,
  disabled = false,
  onConfirm,
  onCancel,
  visibleContentPreference,
  pageSizePreference,
  wrapLinesPreference,
  preferences,
  customPreference,
  ...rest
}: CollectionPreferencesProps) {
  // impl
}

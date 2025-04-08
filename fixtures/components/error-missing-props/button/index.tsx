// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

// should fail because ButtonProps export is missing
export default function Button() {
  return <span>Test</span>;
}

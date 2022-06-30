// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import Internal from './internal';

/**
 * Should not be included into documentation
 */
function InternalSameFile() {
  return <Internal name="test" />;
}

export default function WithInternals() {
  return <InternalSameFile />;
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

interface InternalProps {
  name: string;
}

/**
 * Exported, but not from the main file, should not be documented
 */
export default function Internal({ name }: InternalProps) {
  return <div>{name}</div>;
}

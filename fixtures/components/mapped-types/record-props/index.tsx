// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

type Region = 'us-east-1' | 'eu-west-1' | 'ap-south-1';

export interface RecordPropsProps {
  /** Labels for each region */
  labels: Record<Region, string>;
  /** Optional config */
  config?: { [K in 'debug' | 'verbose']?: boolean };
}

/**
 * Record props component
 */
export default function RecordProps({ labels }: RecordPropsProps) {
  return <div>{JSON.stringify(labels)}</div>;
}

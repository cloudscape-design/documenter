// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
}

export function InternalButton(props: ButtonProps) {
  return <button {...props} />;
}

export default function Button(props: ButtonProps) {
  return <InternalButton {...props} />;
}

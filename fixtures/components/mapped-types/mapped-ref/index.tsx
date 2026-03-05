// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface MappedRefProps {
  /** Label text */
  label: string;
}

export namespace MappedRefProps {
  export interface Ref extends Record<'focus' | 'blur', () => void> {}
}

/**
 * Mapped ref component
 */
const MappedRef = React.forwardRef(({ label }: MappedRefProps, ref: React.Ref<MappedRefProps.Ref>) => {
  return <button ref={ref}>{label}</button>;
});

export default MappedRef;

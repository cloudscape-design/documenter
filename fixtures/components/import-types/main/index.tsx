// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { CancelableEventHandler, NonCancelableEventHandler } from '../../internal/events';
import Dependency, { DependencyProps } from '../dependency';
import { BaseChangeDetail, BaseKeyDetail } from './base-types';

export interface MainProps {
  variant: DependencyProps.Variant;
  onKeyDown: CancelableEventHandler<BaseKeyDetail>;
  onChange: NonCancelableEventHandler<MainProps.ChangeDetail>;
}

export namespace MainProps {
  export type ChangeDetail = BaseChangeDetail;
}

export default function Main({ variant }: MainProps) {
  return <Dependency name="test" variant={variant} />;
}

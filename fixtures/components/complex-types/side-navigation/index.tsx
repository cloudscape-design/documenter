// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { NonCancelableEventHandler } from '../../internal/events';

export interface SideNavigationProps {
  onFollow: NonCancelableEventHandler<SideNavigationProps.FollowDetail>;
}

export namespace SideNavigationProps {
  export interface FollowDetail {
    href: string;
    type?: 'link' | 'link-group' | 'expandable-link-group';
  }
}

export default function SideNavigation(props: SideNavigationProps) {
  return <div>Side navigation</div>;
}

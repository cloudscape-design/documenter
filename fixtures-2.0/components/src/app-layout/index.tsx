// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { AppLayoutProps } from './interfaces';

export { AppLayoutProps };

const AppLayout = React.forwardRef(
  (
    { contentType = 'default', headerSelector = '#b #h', footerSelector = '#b #f', ...rest }: AppLayoutProps,
    ref: React.Ref<AppLayoutProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default AppLayout;

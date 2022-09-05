// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { LinkProps } from './interfaces';

export { LinkProps };

const Link = React.forwardRef(
  (
    { variant = 'secondary', fontSize = 'body-m', color = 'normal', external = false, ...props }: LinkProps,
    ref: React.Ref<LinkProps.Ref>
  ) => {
    // impl
    return null;
  }
);

export default Link;

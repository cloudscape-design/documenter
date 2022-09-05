// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Box, Header, SpaceBetween } from '@cloudscape-design/components';

export default function PageLayout({
  navigation,
  children,
}: {
  navigation: React.ReactNode;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Box margin="xl">
      <SpaceBetween size="s">
        <Header description="Generates docs presentation by recoursively parsing compiled documentation from ./docs">
          Docs Previewer
        </Header>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%' }}>{navigation}</div>
          <div style={{ width: '70%', padding: '0 1rem 0 1rem' }}>{children}</div>
        </div>
      </SpaceBetween>
    </Box>
  );
}

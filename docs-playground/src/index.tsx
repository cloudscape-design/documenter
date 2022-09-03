// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import definitions from './definitions-index';
import Docs from './components/docs';

import '@cloudscape-design/global-styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="loading...">
      <BrowserRouter>
        <Routes>
          {definitions.map(([namespace, items]) => (
            <Route
              path={`/${namespace}/*`}
              key={namespace}
              element={<Docs definitions={items} namespace={namespace} />}
            />
          ))}
          <Route
            path="/*"
            element={
              <Box margin="xxl">
                <SpaceBetween size="s" direction="horizontal">
                  {definitions.map(([namespace]) => (
                    <Link key={namespace} to={namespace}>
                      {namespace}
                    </Link>
                  ))}
                </SpaceBetween>
              </Box>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('app')
);

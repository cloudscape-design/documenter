// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { SideNavigation, Box } from '@cloudscape-design/components';
import definitions from './definitions-index';
import Docs from './components/docs';
import PageLayout from './page-layout';

import './index.css';
import '@cloudscape-design/global-styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="loading...">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('app')
);

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      {definitions.map(([namespace, items]) => (
        <Route path={`/${namespace}/*`} key={namespace} element={<Docs definitions={items} namespace={namespace} />} />
      ))}

      <Route
        path="/*"
        element={
          <PageLayout
            navigation={
              <SideNavigation
                header={{ href: '/', text: 'Index' }}
                onFollow={e => {
                  e.preventDefault();
                  navigate(e.detail.href);
                }}
                items={definitions.map(([namespace]) => ({
                  type: 'link',
                  text: namespace,
                  href: namespace,
                }))}
              />
            }
          >
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box>Select docs category</Box>
            </div>
          </PageLayout>
        }
      />
    </Routes>
  );
}

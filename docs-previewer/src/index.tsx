// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@cloudscape-design/components';
import definitions from './definitions-index';
import Docs from './components/docs';
import PageLayout from './page-layout';

import './index.css';
import '@cloudscape-design/global-styles/index.css';

const root = createRoot(document.getElementById('app')!);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="loading...">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>
);

function App() {
  return (
    <Routes>
      {definitions.map(([namespace, items]) => (
        <Route path={`/${namespace}/*`} key={namespace} element={<Docs definitions={items} namespace={namespace} />} />
      ))}

      <Route
        path="/*"
        element={
          <PageLayout
            header="Categories"
            breadcrumbs={[{ text: 'Categories', href: '/' }]}
            navigationHeader="Categories"
            navigationHeaderHref="/"
            navigationLinks={definitions.map(([namespace]) => ({
              type: 'link',
              text: namespace,
              href: namespace,
            }))}
          >
            <Container>Select category</Container>
          </PageLayout>
        }
      />
    </Routes>
  );
}

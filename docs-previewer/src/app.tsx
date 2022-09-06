// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Container, FormField, Select } from '@cloudscape-design/components';
import useDocs from './use-docs';
import Docs from './components/docs';
import PageLayout from './components/page-layout';

export default function App(): JSX.Element {
  const docs = useDocs();
  const navigate = useNavigate();
  return (
    <Routes>
      {Object.keys(docs).map(packageName => (
        <Route
          path={`/${packageName}/*`}
          key={packageName}
          element={<Docs docs={docs[packageName]} packageName={packageName} />}
        />
      ))}

      <Route
        path="/*"
        element={
          <PageLayout
            header="Packages"
            breadcrumbs={[{ text: 'Packages', href: '/' }]}
            navigationHeader="Packages"
            navigationHeaderHref="/"
            navigationLinks={Object.keys(docs).map(packageName => ({
              type: 'link',
              text: packageName,
              href: packageName,
            }))}
          >
            <Container>
              <FormField
                label="Select package"
                description="The packages documentation comes from ./docs folder. Use npm run gen-docs to generate it."
              >
                <Select
                  selectedOption={null}
                  options={Object.keys(docs).map(packageName => ({ value: packageName, label: packageName }))}
                  onChange={e => e.detail.selectedOption.value && navigate(e.detail.selectedOption.value)}
                  placeholder="package name"
                />
              </FormField>
            </Container>
          </PageLayout>
        }
      />
    </Routes>
  );
}

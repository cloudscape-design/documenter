// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import {
  Header,
  TopNavigation,
  AppLayout,
  ContentLayout,
  BreadcrumbGroup,
  BreadcrumbGroupProps,
  SideNavigation,
  SideNavigationProps,
} from '@cloudscape-design/components';
import * as i18nStrings from './i18n-strings';
import { useNavigate } from 'react-router';

export default function PageLayout({
  header,
  navigationHeader,
  navigationHeaderHref,
  navigationLinks,
  breadcrumbs,
  children,
}: {
  header: string;
  navigationHeader: string;
  navigationHeaderHref: string;
  navigationLinks: SideNavigationProps.Link[];
  breadcrumbs: BreadcrumbGroupProps.Item[];
  children: React.ReactNode;
}): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <TopNavigation identity={{ href: '/', title: 'Docs Previewer' }} i18nStrings={i18nStrings.topNavigation} />
      <AppLayout
        toolsHide={true}
        navigation={
          <SideNavigation
            header={{ text: navigationHeader, href: navigationHeaderHref }}
            items={navigationLinks}
            onFollow={e => {
              e.preventDefault();
              navigate(e.detail.href);
            }}
          />
        }
        breadcrumbs={
          <BreadcrumbGroup
            items={breadcrumbs}
            expandAriaLabel="Show path"
            ariaLabel="Breadcrumbs"
            onFollow={e => {
              e.preventDefault();
              navigate(e.detail.href);
            }}
          />
        }
        content={<ContentLayout header={<Header variant="h1">{header}</Header>}>{children}</ContentLayout>}
        ariaLabels={{ navigationClose: 'close' }}
      />
    </>
  );
}

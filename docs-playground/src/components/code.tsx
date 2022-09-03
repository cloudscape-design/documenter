// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Link from '@cloudscape-design/components/link';

import './code.css';

export function Code({ children }: { children: React.ReactNode }) {
  return <pre className="code">{children}</pre>;
}

export function CodeToken({
  children,
  kind,
  options,
  onNavigate,
}: {
  children: React.ReactNode;
  kind: string;
  options: any;
  onNavigate: (path: string[]) => void;
}) {
  switch (kind) {
    case 'whitespace':
      return (
        <>
          <Token kind="whitespace">{children}</Token>
          <wbr />
        </>
      );
    case 'name':
      return options?.path ? (
        <Link onFollow={() => onNavigate(options?.path)} className="code-token-link">
          <Token kind="name">{children}</Token>
        </Link>
      ) : (
        <Token kind={kind}>{children}</Token>
      );
    default:
      return <Token kind={kind}>{children}</Token>;
  }
}

function Token({ children, kind }: { children: React.ReactNode; kind: string }) {
  return <span className={`code-token-${kind}`}>{children}</span>;
}

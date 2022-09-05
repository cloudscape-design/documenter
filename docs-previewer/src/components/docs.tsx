// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useRef, useState } from 'react';
import { SideNavigation, Box, SpaceBetween, Header, Link, Badge, Table } from '@cloudscape-design/components';
import { Code, CodeToken } from './code';
import Markdown from './markdown';
import PageLayout from '../page-layout';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

type Definition = any;

interface NodeProps {
  definition: Definition;
  onNavigate: (name: string) => void;
  level: number;
}

export default function Docs({
  definitions,
  namespace,
}: {
  definitions: { name: string; folder: string; promise: Promise<Definition> }[];
  namespace: string;
}): JSX.Element {
  const navigate = useNavigate();

  const onNavigate = (path: string) => navigate(`/${namespace}/${path}`);
  const uniqueNames = Array.from(new Set(definitions.map(it => it.name)));

  return (
    <PageLayout
      navigation={
        <SideNavigation
          header={{ href: '/', text: 'Index' }}
          onFollow={e => {
            e.preventDefault();
            navigate(e.detail.href);
          }}
          items={uniqueNames.map(name => ({
            type: 'link',
            text: name,
            href: name,
          }))}
        />
      }
    >
      <Box margin={{ top: 'm' }}>
        <Routes>
          {uniqueNames.map(name => (
            <Route
              path={`/${name}`}
              key={name}
              element={<SelectedDoc definitions={definitions} selected={name} onNavigate={onNavigate} />}
            />
          ))}
        </Routes>
      </Box>
    </PageLayout>
  );
}

function SelectedDoc({
  definitions,
  selected,
  onNavigate,
}: {
  definitions: { name: string; folder: string; promise: Promise<Definition> }[];
  selected: string;
  onNavigate: (path: string) => void;
}) {
  const [selectedDefinitions, selectDefinitions] = useState<Definition[]>([]);

  useEffect(() => {
    const matched = definitions
      .filter(({ name }) => name === selected)
      .sort((a, b) => a.folder.localeCompare(b.folder));

    if (matched.length > 0) {
      Promise.all(matched.map(it => it.promise)).then(selectDefinitions);
    }
  }, [definitions, selected]);

  return (
    <SpaceBetween size="m">
      {selectedDefinitions.map((definition, index) => (
        <LayoutNode key={index} definition={definition} onNavigate={onNavigate} level={1} />
      ))}
    </SpaceBetween>
  );
}

function LayoutNode({ definition, onNavigate, level }: NodeProps) {
  switch (definition.nodeType) {
    case 'Section':
      return <SectionNode definition={definition} onNavigate={onNavigate} level={level} />;
    case 'Table':
      return <TableNode definition={definition} onNavigate={onNavigate} level={level} />;
    case 'Title':
      return <TitleNode definition={definition} onNavigate={onNavigate} level={level} />;
    case 'Comment':
      return <CommentNode definition={definition} onNavigate={onNavigate} level={level} />;
    case 'Code':
      return <CodeNode definition={definition} onNavigate={onNavigate} level={level} />;
    case 'Literal':
      return <LiteralNode definition={definition} onNavigate={onNavigate} level={level} />;
    case 'Empty':
      return <EmptyNode />;
    default:
      return null;
  }
}

function SectionNode({ definition, onNavigate, level }: NodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const title = <LayoutNode definition={definition.title} onNavigate={onNavigate} level={level} />;
  const anchor = definition.title?.name ?? undefined;
  const heading =
    level === 1 ? (
      <Header variant="h2" id={anchor}>
        {title}
      </Header>
    ) : level === 2 ? (
      <Header variant="h3" id={anchor}>
        {title}
      </Header>
    ) : (
      <Box fontWeight="bold" id={anchor}>
        {title}
      </Box>
    );

  useEffect(() => {
    if ('#' + anchor === location.hash && ref.current) {
      ref.current.scrollIntoView();
    }
  }, [location.hash, anchor]);

  return (
    <div>
      {anchor && level < 3 ? <div ref={ref}>{heading}</div> : heading}

      <SpaceBetween size="m">
        {definition.items.map((item: Definition, index: number) => (
          <LayoutNode key={index} definition={item} onNavigate={onNavigate} level={level + 1} />
        ))}
      </SpaceBetween>
    </div>
  );
}

function TableNode({ definition, onNavigate, level = 1 }: NodeProps) {
  if (definition.items.length === 0) {
    return null;
  }

  const columnDefinitions = definition.header.map((name: string, index: number) => ({
    id: name,
    header: name,
    cell: (row: any) => <LayoutNode definition={row[index]} onNavigate={onNavigate} level={level + 1} />,
  }));

  return (
    <Table
      header={<Header>{definition.title}</Header>}
      items={definition.items}
      columnDefinitions={columnDefinitions}
      wrapLines={true}
      sortingDisabled={true}
    />
  );
}

function TitleNode({ definition }: NodeProps) {
  const kind = definition.kind !== 'Property' ? definition.kind : null;
  return (
    <SpaceBetween size="xs" direction="horizontal">
      {definition.flags.map((flag: string) => (
        <Badge key={flag}>{flag}</Badge>
      ))}
      {kind && <div>{kind}</div>}
      {definition.name}
    </SpaceBetween>
  );
}

function CommentNode({ definition }: NodeProps) {
  return (
    <SpaceBetween size="m">
      <Markdown>{definition.markdown}</Markdown>
      {definition.tags.map((tag: any) => (
        <CommentTag key={tag.name} {...tag} />
      ))}
    </SpaceBetween>
  );
}

function CommentTag({ name, markdown }: { name: string; markdown: string }) {
  return (
    <SpaceBetween size="s">
      <Box fontWeight="bold">{name}</Box>
      <Markdown>{markdown}</Markdown>
    </SpaceBetween>
  );
}

function CodeNode({ definition, onNavigate }: NodeProps) {
  return (
    <Code>
      {definition.tokens.map(([value, kind, options]: any, index: number) => (
        <CodeToken key={index} kind={kind} options={options} onNavigate={path => onNavigate(buildUrl(path))}>
          {value}
        </CodeToken>
      ))}
    </Code>
  );
}

function LiteralNode({ definition }: NodeProps) {
  return definition.value;
}

function EmptyNode() {
  return <Box>-</Box>;
}

function buildUrl(path: string[]) {
  return path.filter(entry => !entry.startsWith('@')).join('#');
}

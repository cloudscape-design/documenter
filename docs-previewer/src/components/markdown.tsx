// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Link from '@cloudscape-design/components/link';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Remarkable } from 'remarkable';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RemarkableReactRenderer from 'remarkable-react';

const md = new Remarkable();
md.renderer = new RemarkableReactRenderer({
  components: {
    a: Link,
  },
});

export default function Markdown({ children }: { children: string }): JSX.Element {
  return md.render(children);
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

interface BaseProps<T extends ListProps.Item> {
  /** The items to display. */
  items: ReadonlyArray<T>;
}

interface WithCustomRender<T extends ListProps.Item> {
  /** Custom render function for each item. */
  renderItem: () => React.ReactNode | null;
  /** The currently active item. */
  activeItem: T | undefined;
}

interface WithDefaultRender {
  /** Not applicable when using the default renderer. */
  renderItem?: never;
  /** Not applicable when using the default renderer. */
  activeItem?: never;
}

export type ListProps<T extends ListProps.Item = ListProps.Item> = BaseProps<T> &
  (WithCustomRender<T> | WithDefaultRender);

export namespace ListProps {
  export interface Item {
    id: string;
  }
}

export default function List({ items }: ListProps) {
  return <div>{items.length}</div>;
}

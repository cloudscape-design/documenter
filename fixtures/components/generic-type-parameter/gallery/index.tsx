// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface GalleryProps<T extends GalleryProps.Media = GalleryProps.Media> {
  /** The media to display. */
  media: ReadonlyArray<T>;
  /** The media shown at full size. */
  featuredMedia: T;
  /** The media shown in the preview pane. */
  previewMedia?: T;
}

export namespace GalleryProps {
  export interface Image {
    kind: 'image';
    src: string;
  }

  export interface Video {
    kind: 'video';
    src: string;
  }

  export type Media = Image | Video;
}

export default function Gallery<T extends GalleryProps.Media>({ media }: GalleryProps<T>) {
  return <div>{media.length}</div>;
}

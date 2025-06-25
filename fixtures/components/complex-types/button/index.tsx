// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface ButtonProps {
  style: ButtonProps.Style;
}

export namespace ButtonProps {
  export interface Style {
    root?: {
      background?: {
        active?: string;
        default?: string;
        disabled?: string;
        hover?: string;
      };
      color?: {
        active?: string;
        default?: string;
        disabled?: string;
        hover?: string;
      };
      borderColor?: {
        active?: string;
        default?: string;
        disabled?: string;
        hover?: string;
      };
    };
  }
}

export default function Button(props: ButtonProps) {
  return <div style={{ background: props.style.root?.background?.default }} />;
}

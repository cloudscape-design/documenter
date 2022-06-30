// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export namespace ButtonProps {
  interface Ref {
    focus(): void;
    focus(selector: string): void;
  }
}

const Button = React.forwardRef((props, ref) => {
  return <button />;
});

export default Button;

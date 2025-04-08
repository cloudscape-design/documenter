// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export namespace ButtonProps {
  export interface Ref {
    value: string;
  }
}

const Button = React.forwardRef<ButtonProps.Ref>((props, ref) => {
  return <button />;
});

export default Button;

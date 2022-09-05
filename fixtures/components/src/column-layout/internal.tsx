// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export const COLUMN_TRIGGERS = ['default', 'xxs', 'xs'] as const;
export type ColumnLayoutBreakpoint = typeof COLUMN_TRIGGERS[number] | null;

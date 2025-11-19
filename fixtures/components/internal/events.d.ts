// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export type NonCancelableEventHandler<Detail = Record<string, never>> = (event: any) => void;
export type CancelableEventHandler<Detail = Record<string, never>> = (event: any) => void;

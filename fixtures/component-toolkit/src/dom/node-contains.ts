// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Checks whether the given node is a parent of the other descendant node.
 * This utility is helpful when the parent might be an SVG element,
 * which doesn't have a native `contains` implementation on some browsers like IE11.
 * @param parent Parent node
 * @param descendant Node that is checked to be a descendant of the parent node
 */
export default function nodeContains(parent: Node | null, descendant: Node | null): boolean {
  return false;
}

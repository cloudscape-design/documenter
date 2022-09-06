// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
const hotspotStyles: any = {};
const annotationStyles: any = {};
import { AnnotationWrapper } from '../index.js';
export default class HotspotWrapper extends ComponentWrapper {
  static rootSelector: string = hotspotStyles.root;

  findTrigger() {
    return this.findByClassName(annotationStyles.hotspot)!;
  }

  findAnnotation() {
    return this.findComponent(`.${annotationStyles.annotation}`, AnnotationWrapper);
  }
}
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ElementWrapper } from '@cloudscape-design/test-utils-core/selectors';
import DropdownHostComponentWrapper from '../internal/dropdown-host';
const styles: any = {};
const buttonTriggerStyles: any = {};
const selectPartsStyles: any = {};
export default class ChartFilterWrapper extends DropdownHostComponentWrapper {
  static rootSelector: string = styles['chart-filter'];

  findPlaceholder() {
    return this.findByClassName(selectPartsStyles.placeholder);
  }

  findTrigger() {
    return this.findByClassName(buttonTriggerStyles['button-trigger'])!;
  }
}

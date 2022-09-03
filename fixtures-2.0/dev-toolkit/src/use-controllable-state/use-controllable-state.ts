// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { PropertyDescriptions } from './interfaces';

/**
 * This hook allows you to make a component that can be used both in controlled
 * mode and uncontrolled mode. Pass in your component's props, and then implement
 * your component as if it was only controlled.
 *
 * A component determines its mode (either controlled or uncontrolled) on the
 * first render and keeps it for its lifetime. The mode cannot be switched later.
 *
 * @example
 * Using useControllableState in a custom checkbox component
 * ```
 * const [checked, setChecked] = useControllable(
 *   props.checked,
 *   props.onChange,
 *   props.defaultEnabled ?? false,
 *   {
 *     componentName: 'MyCheckboxComponent',
 *     propertyName: 'checked',
 *     changeHandler: 'onChange'
 *   }
 * );
 *
 * return (
 *   <input
 *     type="checkbox"
 *     checked={checked}
 *     onChange={event => setChecked(event.target.checked)}
 *   />
 * );
 * ```
 *
 * @param controlledValue The value to use for controlled mode
 * @param changeHandler The update handler for controlled mode
 * @param defaultValue The initial value for uncontrolled mode
 * @param propertyDescriptions Property names used when emitting warnings
 * @param fireEvent Callback executed when controllable value changes
 * @returns A tuple of value and value setter
 */
export default function useControllable<ValueType, HandlerType extends (...args: any[]) => unknown>(
  controlledValue: ValueType | undefined,
  changeHandler: HandlerType | undefined,
  defaultValue: ValueType,
  propertyDescriptions: PropertyDescriptions,
  fireEvent = (value: ValueType, handler: HandlerType) => handler(value)
): [ValueType | undefined, (value: ValueType) => void] {
  return null as any;
}

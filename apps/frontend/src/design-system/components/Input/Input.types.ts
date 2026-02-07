import { InputHTMLAttributes } from "react";

import { IconName } from "../Icon";

export type InputProps = {
  /** Extra CSS class applied to the container. */
  className?: string;
  /** When true, the input is disabled. */
  disabled?: boolean;
  /** Error message shown below the input. */
  error?: string;
  /** When true, shows a reset (clear) button when the input has value. */
  hasReset?: boolean;
  /** Helper text shown below the input. */
  helper?: string;
  /** Icon name shown to the left of the input. */
  iconLeft?: IconName;
  /** Icon name shown to the right of the input. */
  iconRight?: IconName;
  /** Unique id for the input (links label to input). */
  id: string;
  /** When true, label and input are laid out inline. */
  inline?: boolean;
  /** Extra CSS class applied to the native input element. */
  inputClassName?: string;
  /** Internal: used when input is inside EditableTable. */
  isEditableTableInput?: boolean;
  /** Internal: used for table corner cell styling. */
  isTableCorner?: boolean;
  /** Label text. */
  label: string;
  /** Placeholder text. */
  placeholder?: string;
  /** When true, the label is visible (otherwise only for screen readers). */
  showLabel?: boolean;
  /** Native input type (text, number, email, etc.). */
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

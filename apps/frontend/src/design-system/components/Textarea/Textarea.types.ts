import { TextareaHTMLAttributes } from "react";

export type TextareaProps = {
  /** Extra CSS class applied to the container. */
  className?: string;
  /** When true, the textarea is disabled. */
  disabled?: boolean;
  /** Error message shown below the textarea. */
  error?: string;
  /** When true, shows a reset (clear) button. */
  hasReset?: boolean;
  /** When true, the textarea can be resized by the user. */
  hasResize?: boolean;
  /** Helper text shown below the textarea. */
  helper?: string;
  /** Unique id for the textarea (links label to control). */
  id: string;
  /** When true, label and textarea are laid out inline. */
  inline?: boolean;
  /** Label text. */
  label: string;
  /** Placeholder text. */
  placeholder?: string;
  /** When true, the label is visible. */
  showLabel?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

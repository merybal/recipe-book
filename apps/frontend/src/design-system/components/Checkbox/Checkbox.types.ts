import type { InputHTMLAttributes } from "react";

export type CheckboxProps = {
  /** Extra CSS class applied to the container. */
  className?: string;
  /** When true, the checkbox is disabled. */
  disabled?: boolean;
  /** Error message shown below the checkbox. */
  error?: string;
  /** Helper text shown below the checkbox. */
  helper?: string;
  /** Unique id for the input (links label to input). */
  id: string;
  /** Label text shown next to the checkbox. */
  label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

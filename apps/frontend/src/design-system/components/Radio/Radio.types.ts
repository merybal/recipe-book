import type { InputHTMLAttributes } from "react";

export type RadioProps = {
  /** Extra CSS class applied to the container. */
  className?: string;
  /** When true, the radio is disabled. */
  disabled?: boolean;
  /** Error message shown below the radio. */
  error?: string;
  /** Helper text shown below the radio. */
  helper?: string;
  /** Unique id for the input (links label to input). */
  id: string;
  /** Label text shown next to the radio. */
  label: string;
  /** Name of the radio group (required for grouping). */
  name: string;
  /** Value of this option when selected. */
  value: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "value"
>;

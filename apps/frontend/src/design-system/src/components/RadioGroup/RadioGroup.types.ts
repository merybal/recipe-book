export type RadioGroupOption = {
  value: string;
  label: string;
};

export type RadioGroupProps = {
  /** Extra CSS class applied to the fieldset. */
  className?: string;
  /** When true, all options are disabled. */
  disabled?: boolean;
  /** Error message shown below the group (once). */
  error?: string;
  /** Helper text shown below the group (once). */
  helper?: string;
  /** Label for the group (e.g. legend). */
  label: string;
  /** Name shared by all radios (required for grouping). */
  name: string;
  /** Options to render (value + label per option). */
  options: RadioGroupOption[];
  /** When true, the group is required (shows * and uses native validation). */
  required?: boolean;
  /** Current selected value (controlled). */
  value: string;
  /** Called when selection changes. */
  onChange: (e: { target: { value: string } }) => void;
};

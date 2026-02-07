export type CheckboxGroupOption = {
  value: string;
  label: string;
};

export type CheckboxGroupProps = {
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
  /** Name shared by all checkboxes (for grouping). */
  name: string;
  /** Options to render (value + label per option). */
  options: CheckboxGroupOption[];
  /** When true, shows required indicator (*). */
  required?: boolean;
  /** Currently selected values (controlled). */
  value: string[];
  /** Called when selection changes (new array of selected values). */
  onChange: (selectedValues: string[]) => void;
};

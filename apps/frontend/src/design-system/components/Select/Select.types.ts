import { IconName } from "../Icon";

export type OptionType = {
  /** Value submitted when this option is selected. */
  value: string;
  /** Label shown in the dropdown. */
  label: string;
};

export type SelectProps = {
  /** Extra CSS class applied to the container. */
  className?: string;
  /** When true, the select is disabled. */
  disabled?: boolean;
  /** Error message shown below the select. */
  error?: string;
  /** Helper text shown below the select. */
  helper?: string;
  /** Icon name shown to the left of the select. */
  iconLeft?: IconName;
  /** Unique id for the select (links label to control). */
  id: string;
  /** When true, label and select are laid out inline. */
  inline?: boolean;
  /** Label text. */
  label: string;
  /** Options to display in the dropdown. */
  options: OptionType[];
  /** Placeholder when no option is selected. */
  placeholder?: string;
  /** When true, the select is read-only (no dropdown). */
  readOnly?: boolean;
  /** When true, the field is required. */
  required?: boolean;
  /** When true, the label is visible. */
  showLabel?: boolean;
  /** Currently selected option value. */
  value: string;
  /** Called when selection changes (event.target.value). */
  onChange?: (event: { target: { value: string } }) => void;
};

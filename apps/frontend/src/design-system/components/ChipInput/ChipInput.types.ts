export type ChipInputProps = {
  /**
   * Extra CSS class applied to the container.
   */
  className?: string;
  /**
   * When true, the field is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Error message shown below the field.
   */
  error?: string;
  /**
   * Helper text shown below the field.
   */
  helper?: string;
  /**
   * Unique id for the input (links label to input).
   */
  id: string;
  /**
   * When true, label and field are laid out inline.
   */
  inline?: boolean;
  /**
   * Label text.
   */
  label: string;
  /**
   * Placeholder shown when the input is empty.
   */
  placeholder?: string;
  /**
   * When true, at least one chip is required.
   */
  required?: boolean;
  /**
   * When true, the label is visible.
   */
  showLabel?: boolean;
  /**
   * Current list of chip values. */
  value: string[];
  /**
   * Called when the list of chips changes.
   */
  onChange: (value: string[]) => void;
};

import { InputProps } from "../Input";
import { SelectProps } from "../Select";
import { OptionType } from "../Select";

export type EditableSelectType = {
  /** Field key (used in onChange payload). */
  key: string;
  /** Label shown for the field. */
  label: string;
  /** Current value. */
  value: string;
  /** When true, the field is required. */
  required?: boolean;
  /** Discriminator for select fields. */
  component?: "select";
  /** Options for the select. */
  options: OptionType[];
  /** Validation function; return error message or undefined. */
  validate?: (value: string) => string | undefined;
} & Omit<SelectProps, "id">;

export type EditableInputType = {
  /** Field key (used in onChange payload). */
  key: string;
  /** Label shown for the field. */
  label: string;
  /** Current value. */
  value: string;
  /** When true, the field is required. */
  required?: boolean;
  /** Discriminator for input fields. */
  component?: "input";
  /** Validation function; return error message or undefined. */
  validate?: (value: string) => string | undefined;
} & Omit<InputProps, "id" | "value" | "onChange">;

export type EditableFieldType = EditableInputType | EditableSelectType;

export type MultipleEditableFieldsProps = {
  /** Extra CSS class applied to the container. */
  className?: string;
  /** List of field definitions (inputs and/or selects). */
  fields: EditableFieldType[];
  /** Label for the whole group (e.g. "Datos de usuario"). */
  singleLabel?: string;
  /** Called when the user saves; receives updated values keyed by field key. */
  onChange: (updatedFields: Record<string, string>) => void;
};

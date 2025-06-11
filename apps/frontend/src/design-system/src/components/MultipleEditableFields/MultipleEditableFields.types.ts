import { InputProps } from "../Input";
import { SelectProps } from "../Select";
import { OptionType } from "../Select";

export type EditableSelectType = {
  key: string;
  label: string;
  value: string;
  required?: boolean;
  component?: "select";
  options: OptionType[];
  validate?: (value: string) => string | undefined;
} & Omit<SelectProps, "id">;

export type EditableInputType = {
  key: string;
  label: string;
  value: string;
  required?: boolean;
  component?: "input";
  validate?: (value: string) => string | undefined;
} & Omit<InputProps, "id" | "value" | "onChange">;

export type EditableFieldType = EditableInputType | EditableSelectType;

export type MultipleEditableFieldsProps = {
  className?: string;
  fields: EditableFieldType[];
  singleLabel?: string;
  onChange: (updatedFields: Record<string, string>) => void;
};

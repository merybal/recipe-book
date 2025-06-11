import { InputProps } from "../Input";

export type EditableFieldType = {
  key: string;
  label: string;
  value: string;
  required?: boolean;
  type?: "text" | "number";
  validate?: (value: string) => string | undefined;
} & Omit<InputProps, "value" | "onChange">;

export type MultipleEditableFieldsProps = {
  className?: string;
  fields: EditableFieldType[];
  singleLabel?: string;
  onChange: (updatedFields: Record<string, string>) => void;
};

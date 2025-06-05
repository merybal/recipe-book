import { InputProps } from "../Input";

export type EditableInputProps = {
  className?: string;
  label: string;
  required?: boolean;
  type?: "text" | "number";
  value: string;
  onChange: (newValue: string) => void;
} & InputProps;

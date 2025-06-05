import { TextareaProps } from "../Textarea";

export type EditableTextareaProps = {
  className?: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (newValue: string) => void;
} & TextareaProps;

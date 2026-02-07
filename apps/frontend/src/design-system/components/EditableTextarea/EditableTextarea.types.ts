import { TextareaProps } from "../Textarea";

export type EditableTextareaProps = {
  /** Extra CSS class applied to the container. */
  className?: string;
  /** Label shown for the field. */
  label: string;
  /** When true, the field is required and shows validation on save. */
  required?: boolean;
  /** Current value. */
  value: string;
  /** Called when the user saves after editing (new value). */
  onChange: (newValue: string) => void;
} & Omit<TextareaProps, "onChange">;

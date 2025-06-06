import { TextareaHTMLAttributes } from "react";

export type TextareaProps = {
  className?: string;
  disabled?: boolean;
  error?: string; //error message
  hasReset?: boolean; //TODO IMPLEMENTAR
  hasResize?: boolean;
  helper?: string; //helper message
  id: string;
  inline?: boolean; //TODO define max width
  label: string;
  placeholder?: string;
  showLabel?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

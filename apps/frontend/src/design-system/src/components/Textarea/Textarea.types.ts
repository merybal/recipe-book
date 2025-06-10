import { TextareaHTMLAttributes } from "react";

export type TextareaProps = {
  className?: string;
  disabled?: boolean;
  error?: string;
  hasReset?: boolean; //TODO IMPLEMENTAR
  hasResize?: boolean;
  helper?: string;
  id: string;
  inline?: boolean;
  label: string;
  placeholder?: string;
  showLabel?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

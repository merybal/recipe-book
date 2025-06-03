import { TextareaHTMLAttributes } from "react";

export type TextareaProps = {
  className?: string;
  disabled?: boolean;
  error?: string; //error message
  hasReset?: boolean;
  helper?: string; //helper message
  id: string;
  inline?: boolean; //TODO define max width
  placeholder?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

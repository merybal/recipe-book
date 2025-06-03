import { InputHTMLAttributes } from "react";
import type { ButtonProps } from "../Button";
import { IconName } from "../Icon";

export type DragAndDropProps = {
  accept?: string;
  boxIcon?: IconName;
  boxLabelInitial?: string;
  boxLabelDragging?: string;
  buttonLabel?: string;
  buttonClassName?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  helper?: string;
  inline?: boolean;
  maxFileAmount?: number;
  maxFileSize?: number; // bytes
  value: File[];
  onChange: (files: File[]) => void;
  onValidationError?: (errors: string[]) => void;
} & Pick<
  ButtonProps,
  "disruptive" | "iconLeft" | "iconRight" | "size" | "variant"
> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">;

import { InputHTMLAttributes } from "react";

import { IconName } from "../Icon";

export type InputProps = {
  className?: string;
  disabled?: boolean;
  error?: string; //error message
  hasReset?: boolean;
  helper?: string; //helper message
  iconLeft?: IconName;
  iconRight?: IconName;
  id: string;
  inline?: boolean;
  label: string;
  placeholder?: string;
  showLabel?: boolean;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

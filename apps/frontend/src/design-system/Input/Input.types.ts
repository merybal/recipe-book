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
  inline?: boolean; //TODO define max width
  placeholder?: string;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

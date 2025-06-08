import { SelectHTMLAttributes } from "react";

import { IconName } from "../Icon";

export type Option = {
  value: string;
  label: string;
};

export type SelectProps = {
  className?: string;
  error?: string;
  helper?: string;
  iconLeft?: IconName;
  id: string;
  inline?: boolean;
  label: string;
  options: Option[];
  placeholder?: string;
  readOnly?: boolean;
  showLabel?: boolean;
  value: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

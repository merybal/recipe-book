import { ButtonHTMLAttributes } from "react";

import { IconName } from "../Icon";

export type ButtonProps = {
  className?: string;
  disabled?: boolean;
  disruptive?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  inline?: boolean;
  label: string;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary" | "text";
  // loading?: boolean;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

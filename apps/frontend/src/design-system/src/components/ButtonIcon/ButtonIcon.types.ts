import { ButtonHTMLAttributes } from "react";
import { IconName } from "../Icon";

export type ButtonIconProps = {
  className?: string;
  disabled?: boolean;
  disruptive?: boolean;
  icon?: IconName;
  label: string; //for aria-label
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  // loading?: boolean;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

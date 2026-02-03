import { ButtonHTMLAttributes } from "react";
import { IconName } from "../Icon";

export type ButtonIconProps = {
  /** Extra CSS class applied to the button. */
  className?: string;
  /** When true, the button is disabled and not clickable. */
  disabled?: boolean;
  /** When true, uses the disruptive (destructive) visual variant. */
  disruptive?: boolean;
  /** Icon name displayed in the button. */
  icon?: IconName;
  /** Accessible label for screen readers (aria-label). */
  label: string;
  /** Visual size of the button and icon. */
  size?: "small" | "medium" | "large";
  /** Native button type (button, submit, reset). */
  type?: "button" | "submit" | "reset";
  /** Visual style variant. */
  variant?: "primary" | "secondary" | "tertiary";
  /** Called when the button is clicked. */
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

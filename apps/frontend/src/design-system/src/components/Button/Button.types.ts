import { ButtonHTMLAttributes } from "react";

import { IconName } from "../Icon";

export type ButtonProps = {
  /** Extra CSS class applied to the button. */
  className?: string;
  /** When true, the button is disabled and not clickable. */
  disabled?: boolean;
  /** When true, uses the disruptive (destructive) visual variant. */
  disruptive?: boolean;
  /** Icon name shown to the left of the label. */
  iconLeft?: IconName;
  /** Icon name shown to the right of the label. */
  iconRight?: IconName;
  /** When true, the button does not grow to full width. */
  inline?: boolean;
  /** Button text. */
  label: string;
  /** Visual size of the button and icons. */
  size?: "small" | "medium" | "large";
  /** Native button type (button, submit, reset). */
  type?: "button" | "submit" | "reset";
  /** Visual style variant. */
  variant?: "primary" | "secondary" | "tertiary" | "text";
  /** Called when the button is clicked. */
  onClick: () => void;
  // loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

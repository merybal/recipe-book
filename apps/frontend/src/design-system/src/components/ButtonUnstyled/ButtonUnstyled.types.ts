import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonUnstyledProps = {
  /** Content inside the button (e.g. text or icon). */
  children: ReactNode;
  /** Extra CSS class applied to the button. */
  className?: string;
  /** When true, the button is disabled and not clickable. */
  disabled?: boolean;
  /** Native button type (button, submit, reset). */
  type?: "button" | "submit" | "reset";
  /** Called when the button is clicked. */
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

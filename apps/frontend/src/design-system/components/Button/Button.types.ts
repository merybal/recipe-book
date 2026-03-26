import type { ButtonHTMLAttributes } from "react";
import type { LinkProps } from "react-router-dom";

import { IconName } from "../Icon";

/** Shared visual props for both button and link variants. */
type SharedButtonProps = {
  /** Extra CSS class applied to the root element. */
  className?: string;
  /** When true, the control is disabled and not clickable. */
  disabled?: boolean;
  /** When true, uses the disruptive (destructive) visual variant. */
  disruptive?: boolean;
  /** Icon name shown to the left of the label. */
  iconLeft?: IconName;
  /** Icon name shown to the right of the label. */
  iconRight?: IconName;
  /** When true, the control does not grow to full width. */
  inline?: boolean;
  /** Visible text label. */
  label: string;
  /** Visual size of the control and icons.
   * @default "medium"
   */
  size?: "medium" | "large";
  /** Visual style variant. */
  variant?: "primary" | "secondary" | "tertiary" | "text";
};

/** Renders a native `<button>`. */
export type ButtonAsButtonProps = SharedButtonProps & {
  href?: undefined;
  /** Native button type (button, submit, reset). */
  type?: "button" | "submit" | "reset";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/**
 * Renders a React Router `<Link>`. `href` maps to Link’s `to`.
 * Accepts anchor/router props from `LinkProps` (e.g. `replace`, `state`, `prefetch`), not `ButtonHTMLAttributes`.
 */
export type ButtonAsLinkProps = SharedButtonProps & {
  /** Target route; passed to `<Link to={...}>`. */
  href: LinkProps["to"];
} & Omit<LinkProps, "to" | "children">;

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

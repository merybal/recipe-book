/**
 * Design system tokens - single source of truth for Box and mixins.
 * Values must match _spacing.scss, _flex.scss, _color.scss, _border.scss.
 */

// Spacing (Padding, Margin, Gap) - matches resolve-size()
export const SPACING_VALUES = [
  "none",
  "xxs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "xxl",
] as const;

// Flex direction - matches $flex-properties
export const FLEX_DIRECTIONS = [
  "row",
  "column",
  "row-reverse",
  "column-reverse",
] as const;

// Justify content - matches $flex-properties
export const JUSTIFY_VALUES = [
  "start",
  "end",
  "center",
  "between",
  "around",
  "evenly",
] as const;

// Align items - matches $flex-properties
export const ALIGN_VALUES = [
  "start",
  "end",
  "center",
  "stretch",
  "baseline",
] as const;

// Flex wrap - matches $flex-properties
export const WRAP_VALUES = ["wrap", "nowrap", "wrap-reverse"] as const;

// Background color - matches theme.color keys
export const COLOR_VALUES = [
  "primary",
  "primary-light",
  "primary-dark",
  "secondary",
  "secondary-light",
  "secondary-dark",
  "secondary-hover",
  "disruptive",
  "disruptive-dark",
  "main-text",
  "secondary-text",
  "outline",
  "disabled",
  "dark-gray",
  "ochre",
  "orange",
  "green",
  "black",
  "white",
  "none",
] as const;

// Border radius - matches theme.border.radius keys
export const BORDER_RADIUS_VALUES = ["sm", "md", "lg", "xl", "full"] as const;

// Type helpers
export type SpacingValue = (typeof SPACING_VALUES)[number];
export type FlexDirection = (typeof FLEX_DIRECTIONS)[number];
export type JustifyContent = (typeof JUSTIFY_VALUES)[number];
export type AlignItems = (typeof ALIGN_VALUES)[number];
export type FlexWrap = (typeof WRAP_VALUES)[number];
export type ColorValue = (typeof COLOR_VALUES)[number];
export type BorderRadiusValue = (typeof BORDER_RADIUS_VALUES)[number];

// Runtime validation
export function isSpacingValue(v: unknown): v is SpacingValue {
  return typeof v === "string" && SPACING_VALUES.includes(v as SpacingValue);
}
export function isFlexDirection(v: unknown): v is FlexDirection {
  return typeof v === "string" && FLEX_DIRECTIONS.includes(v as FlexDirection);
}
export function isJustifyContent(v: unknown): v is JustifyContent {
  return typeof v === "string" && JUSTIFY_VALUES.includes(v as JustifyContent);
}
export function isAlignItems(v: unknown): v is AlignItems {
  return typeof v === "string" && ALIGN_VALUES.includes(v as AlignItems);
}
export function isFlexWrap(v: unknown): v is FlexWrap {
  return typeof v === "string" && WRAP_VALUES.includes(v as FlexWrap);
}
export function isColorValue(v: unknown): v is ColorValue {
  return typeof v === "string" && COLOR_VALUES.includes(v as ColorValue);
}
export function isBorderRadiusValue(v: unknown): v is BorderRadiusValue {
  return (
    typeof v === "string" && BORDER_RADIUS_VALUES.includes(v as BorderRadiusValue)
  );
}

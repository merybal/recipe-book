import type { ReactNode, ElementType, CSSProperties } from "react";
import type {
  SpacingValue,
  ColorValue,
  FlexDirection,
  JustifyContent,
  AlignItems,
  FlexWrap,
  BorderRadiusValue,
} from "../../styles/tokens";

// Re-export token types for consumers
export type { SpacingValue, ColorValue, BorderRadiusValue } from "../../styles/tokens";
export type { FlexDirection, JustifyContent, AlignItems, FlexWrap } from "../../styles/tokens";

/** Token (none, xxs, xs, sm, md, lg, xl, xxl) or custom value (e.g. "6rem", "1.5rem") */
export type SpacingOrCustom = SpacingValue | string;

export type BoxProps = {
  children?: ReactNode;
  className?: string;
  /** HTML element to render (default: div) */
  as?: ElementType;
  /** Use flex layout. Also applied automatically when any flex prop (direction, justify, align, etc.) is passed. */
  flex?: boolean;
  /** Inline display (inline-flex when flex, inline-block when not) */
  inline?: boolean;
  /** Flex direction (default: row) */
  direction?: FlexDirection;
  /** Justify content */
  justify?: JustifyContent;
  /** Align items */
  align?: AlignItems;
  /** Flex wrap */
  wrap?: FlexWrap;
  /** Gap between children */
  gap?: SpacingOrCustom;
  /** Background color (app color token) */
  backgroundColor?: ColorValue;
  /** Padding (all sides) */
  padding?: SpacingOrCustom;
  /** Horizontal padding */
  paddingX?: SpacingOrCustom;
  /** Vertical padding */
  paddingY?: SpacingOrCustom;
  /** Padding top */
  paddingTop?: SpacingOrCustom;
  /** Padding bottom */
  paddingBottom?: SpacingOrCustom;
  /** Padding left */
  paddingLeft?: SpacingOrCustom;
  /** Padding right */
  paddingRight?: SpacingOrCustom;
  /** Margin (all sides) */
  margin?: SpacingOrCustom;
  /** Horizontal margin */
  marginX?: SpacingOrCustom;
  /** Vertical margin */
  marginY?: SpacingOrCustom;
  /** Margin top */
  marginTop?: SpacingOrCustom;
  /** Margin bottom */
  marginBottom?: SpacingOrCustom;
  /** Margin left */
  marginLeft?: SpacingOrCustom;
  /** Margin right */
  marginRight?: SpacingOrCustom;
  /** Flex grow (0 = no grow, 1 = grow) */
  grow?: 0 | 1;
  /** Flex shrink (0 = no shrink) */
  shrink?: 0 | 1;
  /** Full width */
  fullWidth?: boolean;
  /** Full height */
  fullHeight?: boolean;
  /** HTML title attribute (e.g. for tooltip) */
  title?: string;
  /** Border radius (design token) */
  borderRadius?: BorderRadiusValue;
  /** HTML id attribute */
  id?: string;
  /** ARIA role attribute */
  role?: string;
  /** Inline styles (merged with custom spacing values) */
  style?: CSSProperties;
};

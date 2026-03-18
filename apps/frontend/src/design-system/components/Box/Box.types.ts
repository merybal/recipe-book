import type { ReactNode, ElementType } from "react";
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
  gap?: SpacingValue;
  /** Background color (app color token) */
  backgroundColor?: ColorValue;
  /** Padding (all sides) */
  padding?: SpacingValue;
  /** Horizontal padding */
  paddingX?: SpacingValue;
  /** Vertical padding */
  paddingY?: SpacingValue;
  /** Padding top */
  paddingTop?: SpacingValue;
  /** Padding bottom */
  paddingBottom?: SpacingValue;
  /** Padding left */
  paddingLeft?: SpacingValue;
  /** Padding right */
  paddingRight?: SpacingValue;
  /** Margin (all sides) */
  margin?: SpacingValue;
  /** Horizontal margin */
  marginX?: SpacingValue;
  /** Vertical margin */
  marginY?: SpacingValue;
  /** Margin top */
  marginTop?: SpacingValue;
  /** Margin bottom */
  marginBottom?: SpacingValue;
  /** Margin left */
  marginLeft?: SpacingValue;
  /** Margin right */
  marginRight?: SpacingValue;
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
};

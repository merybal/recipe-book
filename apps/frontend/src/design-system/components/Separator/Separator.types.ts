export type SpacingValue =
  | "none"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl";

/** Use only marginY; marginTop and marginBottom must not be passed. */
type MarginYVariant = {
  marginY: SpacingValue;
  marginTop?: never;
  marginBottom?: never;
};

/** Use only marginTop and/or marginBottom; marginY must not be passed. */
type MarginTopBottomVariant = {
  marginY?: never;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
};

/** Exactly one of (marginY) or (marginTop | marginBottom) is allowed. */
export type SeparatorProps = {
  /** Extra CSS class applied to the separator. */
  className?: string;
} & (MarginYVariant | MarginTopBottomVariant);

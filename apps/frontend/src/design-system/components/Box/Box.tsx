import type { BoxProps } from "./Box.types";
import {
  isSpacingValue,
  isFlexDirection,
  isJustifyContent,
  isAlignItems,
  isFlexWrap,
  isColorValue,
  isBorderRadiusValue,
} from "../../styles/tokens";

import clsx from "clsx";
import styles from "./Box.module.scss";

const getDisplayClass = (flex: boolean | undefined, inline: boolean | undefined) => {
  if (flex === true) return inline ? styles["box-inline-flex"] : styles.box;
  return inline ? styles["box-inline-block"] : styles["box-block"];
};

const isCustomSpacing = (v: unknown): v is string =>
  typeof v === "string" && v.length > 0 && !isSpacingValue(v);

const buildSpacingStyle = (props: BoxProps): React.CSSProperties => {
  const s: React.CSSProperties = {};
  if (isCustomSpacing(props.padding)) s.padding = props.padding;
  if (isCustomSpacing(props.paddingTop)) s.paddingTop = props.paddingTop;
  if (isCustomSpacing(props.paddingBottom)) s.paddingBottom = props.paddingBottom;
  if (isCustomSpacing(props.paddingLeft)) s.paddingLeft = props.paddingLeft;
  if (isCustomSpacing(props.paddingRight)) s.paddingRight = props.paddingRight;
  if (isCustomSpacing(props.paddingX)) {
    s.paddingLeft = props.paddingX;
    s.paddingRight = props.paddingX;
  }
  if (isCustomSpacing(props.paddingY)) {
    s.paddingTop = props.paddingY;
    s.paddingBottom = props.paddingY;
  }
  if (isCustomSpacing(props.margin)) s.margin = props.margin;
  if (isCustomSpacing(props.marginTop)) s.marginTop = props.marginTop;
  if (isCustomSpacing(props.marginBottom)) s.marginBottom = props.marginBottom;
  if (isCustomSpacing(props.marginLeft)) s.marginLeft = props.marginLeft;
  if (isCustomSpacing(props.marginRight)) s.marginRight = props.marginRight;
  if (isCustomSpacing(props.marginX)) {
    s.marginLeft = props.marginX;
    s.marginRight = props.marginX;
  }
  if (isCustomSpacing(props.marginY)) {
    s.marginTop = props.marginY;
    s.marginBottom = props.marginY;
  }
  if (isCustomSpacing(props.gap)) s.gap = props.gap;
  return s;
};

const Box = ({
  as: Component = "div",
  children,
  className,
  flex,
  inline = false,
  direction,
  justify,
  align,
  wrap,
  gap,
  backgroundColor,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginX,
  marginY,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  grow,
  shrink,
  fullWidth,
  fullHeight,
  title,
  borderRadius,
  id,
  role,
  style: styleProp,
  ...rest
}: BoxProps) => {
  const spacingStyle = buildSpacingStyle({
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    margin,
    marginX,
    marginY,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    gap,
  });

  const useFlex =
    flex === true ||
    direction != null ||
    justify != null ||
    align != null ||
    wrap != null ||
    gap != null ||
    grow != null ||
    shrink != null;

  return (
    <Component
      id={id}
      role={role}
      className={clsx(
        getDisplayClass(useFlex, inline),
        useFlex && direction && isFlexDirection(direction) && styles[`direction-${direction}`],
        useFlex && justify && isJustifyContent(justify) && styles[`justify-${justify}`],
        useFlex && align && isAlignItems(align) && styles[`align-${align}`],
        useFlex && wrap && isFlexWrap(wrap) && styles[`wrap-${wrap}`],
        useFlex && gap != null && isSpacingValue(gap) && styles[`gap-${gap}`],
        useFlex && grow != null && (grow === 0 || grow === 1) && styles[`grow-${grow}`],
        useFlex && shrink != null && (shrink === 0 || shrink === 1) && styles[`shrink-${shrink}`],
        backgroundColor && isColorValue(backgroundColor) && styles[`bg-${backgroundColor}`],
        padding != null && isSpacingValue(padding) && styles[`padding-${padding}`],
        paddingX != null && isSpacingValue(paddingX) && styles[`paddingX-${paddingX}`],
        paddingY != null && isSpacingValue(paddingY) && styles[`paddingY-${paddingY}`],
        paddingTop != null && isSpacingValue(paddingTop) && styles[`paddingTop-${paddingTop}`],
        paddingBottom != null && isSpacingValue(paddingBottom) && styles[`paddingBottom-${paddingBottom}`],
        paddingLeft != null && isSpacingValue(paddingLeft) && styles[`paddingLeft-${paddingLeft}`],
        paddingRight != null && isSpacingValue(paddingRight) && styles[`paddingRight-${paddingRight}`],
        margin != null && isSpacingValue(margin) && styles[`margin-${margin}`],
        marginX != null && isSpacingValue(marginX) && styles[`marginX-${marginX}`],
        marginY != null && isSpacingValue(marginY) && styles[`marginY-${marginY}`],
        marginTop != null && isSpacingValue(marginTop) && styles[`marginTop-${marginTop}`],
        marginBottom != null && isSpacingValue(marginBottom) && styles[`marginBottom-${marginBottom}`],
        marginLeft != null && isSpacingValue(marginLeft) && styles[`marginLeft-${marginLeft}`],
        marginRight != null && isSpacingValue(marginRight) && styles[`marginRight-${marginRight}`],
        fullWidth && styles.fullWidth,
        fullHeight && styles.fullHeight,
        borderRadius && isBorderRadiusValue(borderRadius) && styles[`radius-${borderRadius}`],
        className
      )}
      style={
        Object.keys(spacingStyle).length > 0 || styleProp
          ? { ...spacingStyle, ...styleProp }
          : undefined
      }
      title={title}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Box;

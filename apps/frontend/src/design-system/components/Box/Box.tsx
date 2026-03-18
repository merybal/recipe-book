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
  if (flex === false) return inline ? styles["box-inline-block"] : styles["box-block"];
  return inline ? styles["box-inline-flex"] : styles.box;
};

const Box = ({
  as: Component = "div",
  children,
  className,
  flex = true,
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
  ...rest
}: BoxProps) => {
  return (
    <Component
      id={id}
      role={role}
      className={clsx(
        getDisplayClass(flex, inline),
        flex !== false && direction && isFlexDirection(direction) && styles[`direction-${direction}`],
        flex !== false && justify && isJustifyContent(justify) && styles[`justify-${justify}`],
        flex !== false && align && isAlignItems(align) && styles[`align-${align}`],
        flex !== false && wrap && isFlexWrap(wrap) && styles[`wrap-${wrap}`],
        flex !== false && gap != null && isSpacingValue(gap) && styles[`gap-${gap}`],
        flex !== false && grow != null && (grow === 0 || grow === 1) && styles[`grow-${grow}`],
        flex !== false && shrink != null && (shrink === 0 || shrink === 1) && styles[`shrink-${shrink}`],
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
      title={title}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Box;

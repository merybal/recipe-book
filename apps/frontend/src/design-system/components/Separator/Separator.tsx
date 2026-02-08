import type { SeparatorProps } from "./Separator.types";

import clsx from "clsx";
import styles from "./Separator.module.scss";

const Separator = ({
  className,
  marginY,
  marginTop,
  marginBottom,
}: SeparatorProps) => {
  const useSeparateMargins = marginTop !== undefined || marginBottom !== undefined;
  const effectiveMarginY = marginY ?? (!useSeparateMargins ? "xl" : undefined);

  return (
    <div
      className={clsx(
        styles.separator,
        effectiveMarginY != null && styles[`marginY-${effectiveMarginY}`],
        marginTop != null && styles[`marginTop-${marginTop}`],
        marginBottom != null && styles[`marginBottom-${marginBottom}`],
        className
      )}
    />
  );
};

export default Separator;

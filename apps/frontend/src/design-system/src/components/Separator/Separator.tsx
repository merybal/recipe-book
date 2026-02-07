import type { SeparatorProps } from "./Separator.types";

import clsx from "clsx";
import styles from "./Separator.module.scss";

const Separator = ({ className, marginY = "xl" }: SeparatorProps) => {
  return (
    <div
      className={clsx(
        styles.separator,
        { [styles[`marginY-${marginY}`]]: marginY },
        className,
      )}
    ></div>
  );
};

export default Separator;

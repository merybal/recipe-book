import type { SeparatorProps } from "./Separator.types";

import clsx from "clsx";
import styles from "./Separator.module.scss";

const Separator = ({
  className,
  align = "center",
  variant = "horizontal",
}: SeparatorProps) => {
  return (
    <div
      className={clsx(
        styles.separator,
        { [styles[`${variant}`]]: variant },
        { [styles[`${align}Text`]]: align },
        className
      )}
    ></div>
  );
};

export default Separator;

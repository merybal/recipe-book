import clsx from "clsx";

import styles from "./Separator.module.scss";

type SeparatorProps = {
  className?: string;
  align?: "left" | "center" | "right";
  variant?: "horizontal" | "vertical";
};

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

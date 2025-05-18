import React from "react";

import clsx from "clsx";

import styles from "./Separator.module.scss";

interface SeparatorProps {
  className?: string;
  align?: "left" | "center" | "right";
  variant?: "horizontal" | "vertical";
}

const Separator: React.FC<SeparatorProps> = ({
  className,
  align = "center",
  variant = "horizontal",
}) => {
  return (
    <div
      className={clsx(
        styles.separator,
        { [styles[`${variant}`]]: variant },
        { [styles[`text-${align}`]]: align },
        className
      )}
    ></div>
  );
};

export default Separator;

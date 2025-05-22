import React from "react";

import clsx from "clsx";
import styles from "./Tag.module.scss";

// TODO revisar diseño, parece boton
//hacer style light
// agregar iconos?

type TagProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "horizontal" | "vertical";
};

const Tag = ({ className, children, variant = "horizontal" }: TagProps) => {
  return (
    <div
      className={clsx(
        styles.tag,
        { [styles[`${variant}`]]: variant },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Tag;

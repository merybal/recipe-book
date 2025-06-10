import type { TagProps } from "./Tag.types";

import clsx from "clsx";
import styles from "./Tag.module.scss";

// TODO revisar diseño, parece boton
//hacer style light
// agregar iconos?

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

import type { ButtonUnstyledProps } from "./ButtonUnstyled.types";

import clsx from "clsx";
import styles from "./ButtonUnstyled.module.scss";

const ButtonUnstyled = ({
  children,
  className,
  disabled = false,
  type = "button",

  onClick,
}: ButtonUnstyledProps) => {
  return (
    <button
      className={clsx(styles["button-unstyled"], className)}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonUnstyled;

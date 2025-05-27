import clsx from "clsx";

import styles from "./ButtonUnstyled.module.scss";

type ButtonUnstyledProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
};

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

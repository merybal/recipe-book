import React from "react";

import clsx from "clsx";

import styles from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  inline?: boolean;
  label: string;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  loading?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  className,
  disabled = false,
  iconLeft,
  iconRight,
  inline,
  label,
  size = "medium",
  type = "button",
  variant = "primary",
  loading = false,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        { [styles[`size-${size}`]]: size },
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;

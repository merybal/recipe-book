import Icon from "./Icon";

import { IconName } from "./Icons";

import clsx from "clsx";

import styles from "./Button.module.scss";

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  disruptive?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  inline?: boolean;
  label: string;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  // loading?: boolean;
  onClick: () => void;
};

const iconSizeMap = {
  small: "xs",
  medium: "sm",
  large: "md",
} as const;

const Button = ({
  className,
  disabled = false,
  disruptive = false,
  iconLeft,
  iconRight,
  inline,
  label,
  size = "medium",
  type = "button",
  variant = "primary",
  // loading = false,
  onClick,
}: ButtonProps) => {
  const pixelSize = iconSizeMap[size];

  return (
    <button
      className={clsx(
        styles.button,
        { [styles[`variant-${variant}`]]: variant },
        { [styles[`disruptive-variant-${variant}`]]: disruptive },
        { [styles[`size-${size}`]]: size },
        { [styles["full-width"]]: !inline },
        className
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {iconLeft && <Icon name={iconLeft} size={pixelSize} />}
      {label}
      {iconRight && <Icon name={iconRight} size={pixelSize} />}
    </button>
  );
};

export default Button;

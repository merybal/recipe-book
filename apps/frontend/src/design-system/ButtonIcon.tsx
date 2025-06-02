import Icon from "./Icon";
import { IconName } from "./Icons";

import { ButtonHTMLAttributes } from "react";
import { iconSizeMap } from "@/constants";

import clsx from "clsx";

import buttonStyles from "./Button.module.scss";
import styles from "./ButtonIcon.module.scss";

export type ButtonIconProps = {
  className?: string;
  disabled?: boolean;
  disruptive?: boolean;
  icon?: IconName;
  label: string; //for aria-label
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  // loading?: boolean;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonIcon = ({
  className,
  disabled = false,
  disruptive = false,
  icon = "image",
  label,
  size = "medium",
  type = "button",
  variant = "primary",
  // loading = false,
  onClick,
  ...rest
}: ButtonIconProps) => {
  const pixelSize = iconSizeMap[size];

  return (
    <button
      aria-label={label}
      className={clsx(
        styles.buttonIcon,
        { [buttonStyles[`variant-${variant}`]]: variant },
        { [buttonStyles[`disruptive-variant-${variant}`]]: disruptive },
        { [styles[`size-${size}`]]: size },
        className
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...rest}
    >
      <Icon name={icon} size={pixelSize} />
    </button>
  );
};

export default ButtonIcon;

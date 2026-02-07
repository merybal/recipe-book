import Icon from "../Icon";

import type { ButtonProps } from "./Button.types";

import { iconSizeMap } from "../Icon";

import clsx from "clsx";

import styles from "./Button.module.scss";

//TODO borrar text si no se termina usando

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
  ...rest
}: ButtonProps) => {
  const pixelSize = iconSizeMap[size];

  return (
    <button
      className={clsx(
        styles.button,
        { [styles[`size-${size}`]]: size },
        { [styles[`variant-${variant}`]]: variant },
        { [styles[`disruptive-variant-${variant}`]]: disruptive },
        { [styles["full-width"]]: !inline },
        className
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={pixelSize} />}
      {label}
      {iconRight && <Icon name={iconRight} size={pixelSize} />}
    </button>
  );
};

export default Button;

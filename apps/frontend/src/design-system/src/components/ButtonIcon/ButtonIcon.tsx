import Icon from "../Icon/Icon";

import { iconSizeMap } from "../Icon";
import type { ButtonIconProps } from "./ButtonIcon.types";

import clsx from "clsx";

import buttonStyles from "../Button/Button.module.scss";
import styles from "./ButtonIcon.module.scss";

const ButtonIcon = ({
  className,
  disabled = false,
  disruptive = false,
  icon = "Image",
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

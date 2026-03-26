import Icon from "../Icon";
import { Link } from "react-router-dom";

import type { ButtonAsButtonProps, ButtonAsLinkProps, ButtonProps } from "./Button.types";

import { iconSizeMap } from "../Icon";

import clsx from "clsx";

import styles from "./Button.module.scss";

const Button = (props: ButtonProps) => {
  if ("href" in props && props.href !== undefined) {
    const {
      href,
      className,
      disabled = false,
      disruptive = false,
      iconLeft,
      iconRight,
      inline,
      label,
      size = "medium",
      variant = "primary",
      onClick: linkOnClick,
      ...linkRest
    } = props as ButtonAsLinkProps;

    const pixelSize = iconSizeMap[size];

    const sharedClassName = clsx(
      styles.button,
      { [styles[`size-${size}`]]: size },
      { [styles[`variant-${variant}`]]: variant },
      { [styles[`disruptive-variant-${variant}`]]: disruptive },
      { [styles["full-width"]]: !inline },
      className,
    );

    const content = (
      <>
        {iconLeft && <Icon name={iconLeft} size={pixelSize} />}
        {label}
        {iconRight && <Icon name={iconRight} size={pixelSize} />}
      </>
    );

    return (
      <Link
        to={href}
        className={sharedClassName}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          linkOnClick?.(e);
        }}
        {...linkRest}
      >
        {content}
      </Link>
    );
  }

  const {
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
    onClick,
    ...buttonRest
  } = props as ButtonAsButtonProps;

  const pixelSize = iconSizeMap[size];

  const sharedClassName = clsx(
    styles.button,
    { [styles[`size-${size}`]]: size },
    { [styles[`variant-${variant}`]]: variant },
    { [styles[`disruptive-variant-${variant}`]]: disruptive },
    { [styles["full-width"]]: !inline },
    className,
  );

  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={pixelSize} />}
      {label}
      {iconRight && <Icon name={iconRight} size={pixelSize} />}
    </>
  );

  return (
    <button
      className={sharedClassName}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...buttonRest}
    >
      {content}
    </button>
  );
};

export default Button;

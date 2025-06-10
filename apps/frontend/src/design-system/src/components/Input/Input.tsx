import { useState } from "react";

import Icon from "../Icon/Icon";
import ButtonUnstyled from "../ButtonUnstyled";

import type { InputProps } from "./Input.types";

import clsx from "clsx";
import styles from "./Input.module.scss";

const Input = ({
  className,
  disabled = false,
  error,
  hasReset,
  helper,
  iconLeft,
  iconRight,
  id,
  inline,
  label,
  placeholder,
  readOnly,
  required,
  showLabel,
  type = "text",
  value,
  onChange,
  ...rest
}: InputProps) => {
  const [isFocused, setIsficused] = useState(false);

  const handleReset = () => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    )?.set;

    if (nativeInputValueSetter) {
      const input = document.getElementById(id) as HTMLInputElement | null;
      nativeInputValueSetter.call(input, "");
      const ev2 = new Event("input", { bubbles: true });
      input?.dispatchEvent(ev2);
    }

    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const showReset = hasReset && value && !disabled;

  return (
    <div className={className}>
      <label className={clsx(styles.label)} htmlFor={id}>
        <p
          className={clsx(styles["label-text"], {
            [styles["show-label"]]: showLabel,
          })}
        >
          {label} {required && <span aria-hidden="true">*</span>}
        </p>
        {iconLeft && (
          <Icon
            className={clsx(
              styles["icon-left"],
              { [styles["icon-position"]]: !showLabel },
              { [styles["icon-with-label"]]: showLabel }
            )}
            {...(isFocused && { color: "primary" })}
            {...(disabled && { color: "outline" })}
            {...(error && !isFocused && { color: "disruptive" })}
            name={iconLeft}
            size="sm"
          />
        )}
        <input
          className={clsx(
            styles.input,
            { [styles.inline]: inline },
            { [styles["icon-left-space"]]: iconLeft },
            { [styles["icon-right-space"]]: iconRight },
            { [styles.error]: error },
            { [styles["read-only"]]: readOnly }
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helper ? `${id}-helper` : undefined
          }
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsficused(true)}
          onBlur={() => setIsficused(false)}
          {...rest}
        />
        {showReset ? (
          <ButtonUnstyled
            aria-label="Limpiar campo"
            className={clsx(
              styles["icon-right"],
              { [styles["icon-position"]]: !showLabel },
              { [styles["icon-with-label"]]: showLabel },
              styles["reset-button"]
            )}
            onClick={handleReset}
          >
            {/* TODO cambiar a button tertiary? */}
            <Icon
              name="CircleX"
              {...(isFocused && { color: "primary" })}
              {...(error && !isFocused && { color: "disruptive" })}
              size="sm"
            />
          </ButtonUnstyled>
        ) : (
          iconRight && (
            <Icon
              className={clsx(
                styles["icon-right"],
                { [styles["icon-position"]]: !showLabel },
                { [styles["icon-with-label"]]: showLabel }
              )}
              {...(isFocused && { color: "primary" })}
              {...(disabled && { color: "outline" })}
              {...(error && !isFocused && { color: "disruptive" })}
              name={iconRight}
              size="sm"
            />
          )
        )}
      </label>
      {error && (
        <p
          className={clsx(styles.message, styles["error-message"])}
          id={`${id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
      {helper && !error && (
        <p className={styles.message} id={`${id}-helper`}>
          {helper}
        </p>
      )}
    </div>
  );
};

export default Input;

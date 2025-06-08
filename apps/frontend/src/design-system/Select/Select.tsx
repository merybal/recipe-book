import { useState } from "react";
import clsx from "clsx";

import Icon from "../Icon/Icon";

import type { SelectProps } from "./Select.types";

import styles from "./Select.module.scss";
import inputStyles from "../Input/Input.module.scss";

const Select = ({
  className,
  disabled = false,
  error,
  helper,
  iconLeft,
  id,
  inline,
  label,
  placeholder = "Seleccionar...",
  readOnly,
  required,
  showLabel,
  value,
  options,
  onChange,
  ...rest
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (readOnly) {
      e.preventDefault();
      return;
    }
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    if (readOnly) {
      e.preventDefault();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLSelectElement>) => {
    if (readOnly) {
      e.preventDefault();
    }
  };

  return (
    <div className={className}>
      <label className={clsx(inputStyles.label)} htmlFor={id}>
        <p
          className={clsx(
            inputStyles["label-text"],
            showLabel && inputStyles["show-label"]
          )}
        >
          {label} {required && <span aria-hidden="true">*</span>}
        </p>

        {iconLeft && (
          <Icon
            className={clsx(
              inputStyles["icon-left"],
              { [inputStyles["icon-position"]]: !showLabel },
              { [inputStyles["icon-with-label"]]: showLabel }
            )}
            {...(isFocused && { color: "primary" })}
            {...(disabled && { color: "outline" })}
            {...(error && !isFocused && { color: "disruptive" })}
            name={iconLeft}
            size="sm"
          />
        )}

        <select
          className={clsx(
            inputStyles.input,
            styles.select,
            { [inputStyles.inline]: inline },
            { [inputStyles["icon-left-space"]]: iconLeft },
            { [inputStyles.error]: error },
            { [inputStyles["read-only"]]: readOnly }
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helper ? `${id}-helper` : undefined
          }
          aria-readonly={readOnly || undefined}
          disabled={disabled}
          id={id}
          required={required}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p
          className={clsx(inputStyles.message, inputStyles["error-message"])}
          id={`${id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
      {helper && !error && (
        <p className={inputStyles.message} id={`${id}-helper`}>
          {helper}
        </p>
      )}
    </div>
  );
};

export default Select;

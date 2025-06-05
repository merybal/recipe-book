import { useEffect, useRef } from "react";

import { TextareaProps } from "./Textarea.types";

import clsx from "clsx";
import styles from "./Textarea.module.scss";
import inputStyles from "../Input/Input.module.scss";

const Textarea = ({
  className,
  disabled = false,
  error,
  helper,
  id,
  inline,
  label,
  placeholder,
  readOnly,
  required,
  rows = 1,
  showLabel,
  value,
  onChange,
  ...rest
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    handleResize();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleResize();
    onChange?.(e);
  };

  return (
    <>
      <label
        className={clsx(inputStyles.label, styles.label, className)}
        htmlFor={id}
      >
        <p
          className={clsx(
            inputStyles["label-text"],
            showLabel && inputStyles["show-label"]
          )}
        >
          {label} {required && <span aria-hidden="true">*</span>}
        </p>
        <textarea
          rows={rows}
          className={clsx(
            inputStyles.input,
            styles.textarea,
            { [styles["full-width"]]: !inline },
            { [inputStyles["error"]]: error },
            { [inputStyles["read-only"]]: readOnly },
            { [styles["read-only"]]: readOnly }
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helper ? `${id}-helper` : undefined
          }
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          ref={textareaRef}
          readOnly={readOnly}
          required={required}
          value={value}
          onChange={handleChange}
          {...rest}
        />
      </label>
      {error && !disabled && (
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
    </>
  );
};

export default Textarea;

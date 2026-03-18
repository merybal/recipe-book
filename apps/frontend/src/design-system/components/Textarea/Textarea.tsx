import { useEffect, useRef } from "react";

import Box from "../Box";
import { TextareaProps } from "./Textarea.types";

import clsx from "clsx";
import styles from "./Textarea.module.scss";

const Textarea = ({
  className,
  disabled = false,
  error,
  hasResize,
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
    <Box
      className={clsx(
        styles["textarea-container"],
        { [styles.inline]: inline },
        className
      )}
      fullWidth
    >
      <label className={styles.label} htmlFor={id}>
        <p
          className={clsx(
            styles["label-text"],
            showLabel && styles["show-label"]
          )}
        >
          {label} {required && <span className="required-asterisk" aria-hidden="true">*</span>}
        </p>
        <textarea
          rows={rows}
          className={clsx(
            styles.textarea,
            { [styles.error]: error },
            { [styles["remove-resize"]]: !hasResize },
            { [styles["read-only"]]: readOnly && !disabled }
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
        <p className={styles["error-message"]} id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
      {helper && !error && (
        <p className={styles["helper-message"]} id={`${id}-helper`}>
          {helper}
        </p>
      )}
    </Box>
  );
};

export default Textarea;

import { useEffect, useRef } from "react";

import { TextareaProps } from "./Textarea.types";

import clsx from "clsx";
import styles from "./Textarea.module.scss";

const Textarea = ({
  className,
  disabled = false,
  error,
  helper,
  id,
  inline,
  placeholder,
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
      <label className={clsx(styles.label, className)} htmlFor={id}>
        <textarea
          // TODO arranca con mas rows?
          rows={1}
          className={clsx(
            styles.textarea,
            { [styles["full-width"]]: !inline },
            { [styles["error"]]: error }
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helper ? `${id}-helper` : undefined
          }
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          {...rest}
        />
      </label>
      {error && !disabled && (
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
    </>
  );
};

export default Textarea;

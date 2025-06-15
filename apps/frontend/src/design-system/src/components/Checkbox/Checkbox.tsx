import clsx from "clsx";
import styles from "./Checkbox.module.scss";

import type { InputHTMLAttributes } from "react";

type CheckboxProps = {
  id: string;
  label: string;
  className?: string;
  error?: string;
  helper?: string;
  disabled?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Checkbox = ({
  id,
  label,
  className,
  error,
  helper,
  disabled = false,
  ...rest
}: CheckboxProps) => {
  return (
    <div className={clsx(styles["checkbox-container"], className)}>
      <label
        htmlFor={id}
        className={clsx(styles.label, { [styles.disabled]: disabled })}
      >
        <input
          id={id}
          type="checkbox"
          className={clsx(styles.input)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helper ? `${id}-helper` : undefined
          }
          {...rest}
        />
        <span className={styles["custom-checkbox"]} aria-hidden="true" />
        <span className={styles["label-text"]}>{label}</span>
      </label>
      {error && (
        <p className={styles["error-message"]} id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
      {helper && !error && (
        <p className={styles["helper-message"]} id={`${id}-helper`}>
          {helper}
        </p>
      )}
    </div>
  );
};

export default Checkbox;

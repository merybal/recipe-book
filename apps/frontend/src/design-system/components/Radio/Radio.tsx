import clsx from "clsx";
import styles from "./Radio.module.scss";

import type { RadioProps } from "./Radio.types";

const Radio = ({
  id,
  name,
  value,
  label,
  className,
  error,
  helper,
  disabled = false,
  ...rest
}: RadioProps) => {
  return (
    <div className={clsx(styles["radio-container"], className)}>
      <label
        htmlFor={id}
        className={clsx(styles.label, { [styles.disabled]: disabled })}
      >
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          className={styles.input}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helper ? `${id}-helper` : undefined
          }
          {...rest}
        />
        <span className={styles["custom-radio"]} aria-hidden="true" />
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

export default Radio;

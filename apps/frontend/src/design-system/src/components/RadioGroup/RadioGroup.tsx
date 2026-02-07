import clsx from "clsx";
import Radio from "../Radio";
import styles from "./RadioGroup.module.scss";

import type { RadioGroupProps } from "./RadioGroup.types";

const RadioGroup = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  helper,
  disabled = false,
  required = false,
  className,
}: RadioGroupProps) => {
  const firstValue = options[0]?.value;

  return (
    <fieldset
      className={clsx(styles["radio-group"], className)}
      aria-invalid={!!error}
      aria-required={required}
    >
      <legend className={styles.legend}>
        {label} {required && <span aria-hidden="true">*</span>}
      </legend>
      {options.map((option) => (
        <Radio
          key={option.value}
          id={`${name}-${option.value}`}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={onChange}
          disabled={disabled}
          required={required && option.value === firstValue}
          error={error && option.value === firstValue ? error : undefined}
          helper={
            helper && !error && option.value === firstValue ? helper : undefined
          }
        />
      ))}
    </fieldset>
  );
};

export default RadioGroup;

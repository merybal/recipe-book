import clsx from "clsx";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./CheckboxGroup.module.scss";

import type { CheckboxGroupProps } from "./CheckboxGroup.types";

const CheckboxGroup = ({
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
}: CheckboxGroupProps) => {
  const firstValue = options[0]?.value;

  const handleChange = (optionValue: string, checked: boolean) => {
    const next = checked
      ? [...value, optionValue]
      : value.filter((v) => v !== optionValue);
    onChange(next);
  };

  return (
    <fieldset
      className={clsx(styles["checkbox-group"], className)}
      aria-invalid={!!error}
      aria-required={required}
    >
      <legend className={styles.legend}>
        {label} {required && <span className="required-asterisk" aria-hidden="true">*</span>}
      </legend>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          id={`${name}-${option.value}`}
          name={name}
          label={option.label}
          checked={value.includes(option.value)}
          onChange={(e) => handleChange(option.value, e.target.checked)}
          disabled={disabled}
          error={error && option.value === firstValue ? error : undefined}
          helper={
            helper && !error && option.value === firstValue ? helper : undefined
          }
        />
      ))}
    </fieldset>
  );
};

export default CheckboxGroup;

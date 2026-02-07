import { useState, useCallback } from "react";
import type { ChipInputProps } from "./ChipInput.types";
import Chip from "../Chip";
import clsx from "clsx";
import styles from "./ChipInput.module.scss";

const ChipInput = ({
  className,
  disabled = false,
  error,
  helper,
  id,
  inline,
  label,
  placeholder,
  required,
  showLabel,
  value,
  onChange,
}: ChipInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addChip = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      if (value.includes(trimmed)) return;
      onChange([...value, trimmed]);
      setInputValue("");
    },
    [value, onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip(inputValue);
    }
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) addChip(inputValue);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div
      className={clsx(
        styles["chip-input-container"],
        { [styles.inline]: inline },
        className,
      )}
    >
      <label className={styles.label} htmlFor={id}>
        <p
          className={clsx(
            styles["label-text"],
            showLabel && styles["show-label"],
          )}
        >
          {label} {required && <span aria-hidden="true">*</span>}
        </p>
        <div
          className={clsx(
            styles.field,
            { [styles.error]: error },
            { [styles.disabled]: disabled },
          )}
        >
          {value.map((chip, index) => (
            <Chip key={`${chip}-${index}`} onRemove={() => handleRemove(index)}>
              {chip}
            </Chip>
          ))}
          <input
            id={id}
            type="text"
            className={styles["chip-input"]}
            placeholder={value.length === 0 ? placeholder : ""}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : helper ? `${id}-helper` : undefined
            }
          />
        </div>
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

export default ChipInput;

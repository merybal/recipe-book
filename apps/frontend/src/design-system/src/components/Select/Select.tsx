import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import Icon from "../Icon/Icon";

import type { SelectProps, OptionType } from "./Select.types";

import styles from "./Select.module.scss";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    if (isOpen && highlightedIndex !== null && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeList();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleList = () => {
    if (!readOnly && !disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const closeList = () => {
    setIsOpen(false);
    setHighlightedIndex(null);
  };

  const handleSelect = (option: OptionType) => {
    if (!readOnly && !disabled && option.value !== value) {
      onChange?.({ target: { value: option.value } } as any);
    }
    closeList();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled || readOnly) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev === null ? 0 : Math.min(prev + 1, options.length - 1)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev === null ? options.length - 1 : Math.max(prev - 1, 0)
        );
        break;
      case "Enter":
        if (isOpen && highlightedIndex !== null) {
          handleSelect(options[highlightedIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case "Escape":
        closeList();
        break;
    }
  };

  return (
    <div
      className={clsx(
        styles["select-container"],
        { [styles.inline]: inline },
        className
      )}
      ref={containerRef}
    >
      <label className={styles.label} htmlFor={id}>
        <p
          className={clsx(styles["label-text"], {
            [styles["show-label"]]: showLabel,
          })}
        >
          {label} {required && <span aria-hidden="true">*</span>}
        </p>

        <div
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          aria-invalid={!!error}
          aria-readonly={readOnly || undefined}
          aria-describedby={
            error ? `${id}-error` : helper ? `${id}-helper` : undefined
          }
          className={clsx(styles.select, {
            [styles.error]: error && !disabled,
            [styles["read-only"]]: readOnly && !disabled,
            [styles.disabled]: disabled,
          })}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          onClick={toggleList}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        >
          {iconLeft && (
            <Icon
              className={styles["icon-left"]}
              {...(isFocused && { color: "primary" })}
              {...(disabled && { color: "outline" })}
              {...(error && !isFocused && { color: "disruptive" })}
              name={iconLeft}
              size="sm"
            />
          )}

          <p
            className={clsx(
              selectedOption?.label
                ? styles["selected-label"]
                : styles["placeholder"]
            )}
          >
            {selectedOption?.label || placeholder}
          </p>

          <Icon
            className={clsx(styles["icon-right"], {
              [styles["rotate-chevron"]]: isOpen,
            })}
            {...(isFocused && { color: "primary" })}
            {...(disabled && { color: "outline" })}
            {...(error && !isFocused && { color: "disruptive" })}
            name="ChevronDown"
            size="sm"
          />
        </div>
      </label>

      {isOpen && (
        <ul
          id={`${id}-listbox`}
          className={styles.dropdown}
          ref={listRef}
          role="listbox"
        >
          {options.map((option, idx) => (
            <li
              id={`${id}-option-${idx}`}
              aria-selected={value === option.value}
              className={clsx(styles.option, {
                [styles.selected]: value === option.value,
                [styles.highlighted]: idx === highlightedIndex,
              })}
              key={option.value}
              role="option"
              onMouseDown={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

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

export default Select;

import { useState, useEffect } from "react";
import Input from "@/design-system/src/components/Input";
import Select from "@/design-system/src/components/Select";
import ButtonIcon from "@/design-system/src/components/ButtonIcon";

import { MultipleEditableFieldsProps } from "./MultipleEditableFields.types";

import clsx from "clsx";
import styles from "./MultipleEditableFields.module.scss";

/**
 * TODO revisar como se maneja el ancho de los fields
 * que pasa en mobile?
 */

const MultipleEditableFields = ({
  className,
  fields,
  singleLabel,
  onChange,
}: MultipleEditableFieldsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValues, setLocalValues] = useState<Record<string, string>>({});
  // const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    const initialValues: Record<string, string> = {};
    fields.forEach((field) => {
      initialValues[field.key] = field.value;
    });
    setLocalValues(initialValues);
  }, [fields]);

  const handleChange = (key: string, value: string, required?: boolean) => {
    setLocalValues((prev) => ({ ...prev, [key]: value }));

    const field = fields.find((f) => f.key === key);
    const validateFn = field?.validate;

    if (validateFn) {
      const error = validateFn(value);
      setErrors((prev) => ({ ...prev, [key]: error }));
    } else if (required && value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [key]: `El campo "${field?.label || key}" es obligatorio.`,
      }));
    } else {
      setErrors((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [key]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach(({ key, required, label, validate }) => {
      const value = localValues[key]?.trim();

      if (required && !value) {
        newErrors[key] = `El campo "${label}" es obligatorio.`;
        return;
      }

      if (validate && value) {
        const validationMessage = validate(value);
        if (validationMessage) {
          newErrors[key] = validationMessage;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onChange(localValues);
    setErrors({});
    setIsEditing(false);
  };

  const handleCancel = () => {
    const originalValues: Record<string, string> = {};
    fields.forEach((field) => {
      originalValues[field.key] = field.value;
    });
    setLocalValues(originalValues);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className={clsx(styles["editable-fields-container"], className)}>
      {singleLabel && <p className={styles["single-label"]}>{singleLabel}</p>}

      <div className={styles["fields-container"]}>
        {fields.map((field) => {
          if (field.component === "input") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { key, label, required, validate, value, ...restInputProps } =
              field;

            return (
              <Input
                key={key}
                id={key}
                className={styles["field-input"]}
                error={errors[key]}
                label={label}
                readOnly={!isEditing}
                required={required}
                value={localValues[key] || ""}
                onChange={(e) => handleChange(key, e.target.value, required)}
                {...restInputProps}
              />
            );
          }

          if (field.component === "select") {
            const {
              key,
              label,
              options,
              required,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              validate,
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              value,
              ...restSelectProps
            } = field;

            return (
              <Select
                id={key}
                key={key}
                label={label}
                options={options}
                readOnly={!isEditing}
                value={localValues[key] || ""}
                onChange={(e) => handleChange(key, e.target.value, required)}
                {...restSelectProps}
              />
            );
          }
        })}
      </div>

      {isEditing ? (
        <div className={styles["button-container"]}>
          <ButtonIcon
            icon="Check"
            label="guardar"
            size="small"
            variant="primary"
            onClick={handleSave}
          />
          <ButtonIcon
            icon="X"
            label="cancelar"
            size="small"
            variant="secondary"
            onClick={handleCancel}
          />
        </div>
      ) : (
        <ButtonIcon
          className={styles["edit-button"]}
          icon="Pencil"
          label="editar campos"
          size="small"
          variant="secondary"
          onClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default MultipleEditableFields;

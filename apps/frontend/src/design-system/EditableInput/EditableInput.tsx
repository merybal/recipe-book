import { useState, useEffect } from "react";
import Input from "@/design-system/Input";
import ButtonIcon from "@/design-system/ButtonIcon";

import { EditableInputProps } from "./EditableInput.types";

import clsx from "clsx";
import styles from "./EditableInput.module.scss";

const EditableInput = ({
  className,
  id,
  inline,
  label,
  required,
  type,
  value,
  onChange,
  ...rest
}: EditableInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (required) {
      setHasError(newValue.trim() === "");
    }
  };

  const handleSave = () => {
    onChange(localValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsEditing(false);
  };

  return (
    <div className={clsx(styles["editable-field-container"], className)}>
      <Input
        id={id}
        className={clsx({ [styles["input-width"]]: !inline })}
        {...(hasError && { error: "Este campo es requerido" })}
        inline={inline}
        label={label}
        {...(!isEditing && { readOnly: true })}
        required={required}
        showLabel
        type={type}
        value={localValue}
        onChange={handleChange}
        {...rest}
      />
      {isEditing ? (
        <div className={clsx(styles["button-container"])}>
          <ButtonIcon
            icon="Check"
            disabled={required && localValue.trim() === ""}
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
          label={`editar ${label ?? "campo"}`}
          size="small"
          variant="secondary"
          onClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

export default EditableInput;

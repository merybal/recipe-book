import { useState, useEffect } from "react";
import Textarea from "@/design-system/Textarea";
import ButtonIcon from "@/design-system/ButtonIcon";
import type { EditableTextareaProps } from "./EditableTextarea.types";

import clsx from "clsx";
import editableInputStyles from "../EditableInput/EditableInput.module.scss";

const EditableTextarea = ({
  id,
  className,
  inline,
  label,
  required,
  value,
  onChange,
}: EditableTextareaProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div
      className={clsx(
        editableInputStyles["editable-field-container"],
        className
      )}
    >
      <Textarea
        className={clsx({ [editableInputStyles["input-width"]]: !inline })}
        {...(hasError && { error: "Este campo es requerido" })}
        id={id}
        hasResize={false}
        inline={inline}
        label={label}
        readOnly={!isEditing}
        required={required}
        showLabel
        value={localValue}
        onChange={handleChange}
      />
      {isEditing ? (
        <div
          className={clsx(editableInputStyles["button-container"], {
            [editableInputStyles["error-spacing"]]: hasError,
          })}
        >
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
          className={editableInputStyles["edit-button"]}
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

export default EditableTextarea;

import { useState, useEffect, useCallback } from "react";

import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Icon from "../Icon/Icon";

import type { DragAndDropProps } from "./DragAndDrop.types";
import { iconSizeMap } from "../Icon";

import clsx from "clsx";
import styles from "./DragAndDrop.module.scss";
import buttonStyles from "../Button/Button.module.scss";

//TODO crear utils y organizar el DS. se pasan los mixins al ds?

const DragAndDrop = ({
  accept,
  boxIcon,
  boxLabelInitial = "Arrastrá un archivo acá o",
  boxLabelDragging = "Soltá el archivo acá",
  buttonLabel = "Busca en tu PC",
  buttonClassName,
  className,
  disabled,
  disruptive,
  error,
  helper,
  iconLeft,
  iconRight,
  inline,
  maxFileAmount,
  maxFileSize,
  multiple,
  size = "medium",
  value = [],
  variant = "primary",
  onChange,
  onValidationError,
  ...rest
}: DragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const pixelSize = iconSizeMap[size];

  useEffect(() => {
    const newPreviews: string[] = [];

    let pendingReaders = 0;

    value.forEach((file) => {
      const type = file.type;
      if (type.startsWith("image/")) {
        newPreviews.push(URL.createObjectURL(file));
      } else if (type.startsWith("text/")) {
        pendingReaders++;
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            newPreviews.push(reader.result);
          }
          pendingReaders--;
          if (pendingReaders === 0) {
            setPreviews([...newPreviews]);
          }
        };
        reader.readAsText(file);
      } else {
        newPreviews.push(`Archivo: ${file.name}`);
      }
    });

    if (pendingReaders === 0) {
      setPreviews(newPreviews);
    }

    return () => {
      newPreviews.forEach((url) => {
        if (url.startsWith("blob:") || url.startsWith("data:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [value]);

  const processFiles = useCallback(
    (files: FileList) => {
      let newFiles = Array.from(files);
      const errors: string[] = [];

      if (accept) {
        const acceptedTypes = accept.split(",").map((t) => t.trim());
        newFiles = newFiles.filter((file) => {
          const isAccepted = acceptedTypes.some((type) =>
            type.startsWith(".") ? file.name.endsWith(type) : file.type === type
          );
          if (!isAccepted) {
            errors.push(`Tipo de archivo no permitido: ${file.name}`);
          }
          return isAccepted;
        });
      }

      if (maxFileSize) {
        newFiles = newFiles.filter((file) => {
          if (file.size > maxFileSize) {
            errors.push(
              `El archivo ${file.name} excede el tamaño máximo de ${Math.round(
                maxFileSize / 1024 / 1024
              )}MB`
            );
            return false;
          }
          return true;
        });
      }

      if (maxFileAmount && value.length + newFiles.length > maxFileAmount) {
        const cantidadDisponible = maxFileAmount - value.length;
        errors.push(`Podés subir hasta ${maxFileAmount} archivos en total`);
        newFiles = newFiles.slice(0, cantidadDisponible);
      }

      newFiles = newFiles.filter((file) => {
        const isDuplicate = value.some(
          (existing) =>
            existing.name === file.name && existing.size === file.size
        );
        if (isDuplicate) {
          errors.push(`Archivo duplicado: ${file.name}`);
          return false;
        }
        return true;
      });

      setValidationErrors(errors);
      onValidationError?.(errors);

      if (newFiles.length > 0) {
        onChange(multiple ? [...value, ...newFiles] : [newFiles[0]]);
      }
    },
    [
      value,
      onChange,
      multiple,
      accept,
      maxFileSize,
      maxFileAmount,
      onValidationError,
    ]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const files = e.dataTransfer.files;
    if (files.length) {
      processFiles(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.target.files) {
      processFiles(e.target.files);
      e.target.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);
  };

  const handleRemoveFile = (index: number) => {
    if (disabled) return;
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const allAreImages = previews.every(
    (preview) =>
      typeof preview === "string" &&
      (preview.startsWith("blob:") || preview.startsWith("data:"))
  );

  return (
    <>
      <div
        className={clsx(
          styles["drop-zone"],
          !inline && styles["full-width"],
          isDragging && styles["drag-over"],
          disabled && styles.disabled,
          className
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {boxIcon && <Icon name={boxIcon} size="xl" />}
        <p>{isDragging ? boxLabelDragging : boxLabelInitial}</p>
        <label
          className={clsx(
            buttonStyles.button,
            { [buttonStyles[`variant-${variant}`]]: variant },
            { [buttonStyles[`disruptive-variant-${variant}`]]: disruptive },
            { [buttonStyles[`size-${size}`]]: size },
            buttonClassName
          )}
        >
          {iconLeft && <Icon name={iconLeft} size={pixelSize} />}
          {buttonLabel}
          {iconRight && <Icon name={iconRight} size={pixelSize} />}
          <input
            accept={accept}
            hidden
            multiple={multiple}
            type="file"
            onChange={handleChange}
            disabled={disabled}
            {...rest}
          />
        </label>
        {helper && <p className={styles.message}>{helper}</p>}
        {validationErrors.map((error, i) => (
          <p key={i} className={clsx(styles.message, styles["error-message"])}>
            {error}
          </p>
        ))}
        {error && (
          <p className={clsx(styles.message, styles["error-message"])}>
            {error}
          </p>
        )}
      </div>

      {value.length > 0 && value.length > 0 && (
        <div
          className={clsx(
            styles["preview-list"],
            allAreImages && styles["row-layout"],
            !inline && styles["full-width"]
          )}
        >
          {value.map((file, idx) => {
            const preview = previews[idx];
            const isImagePreview =
              typeof preview === "string" &&
              (preview.startsWith("blob:") || preview.startsWith("data:"));

            return (
              <div
                className={clsx(
                  styles["preview-container"],
                  isImagePreview && allAreImages && styles["image-container"]
                )}
                key={idx}
              >
                {!allAreImages && <Icon name="file" size={pixelSize} />}
                {isImagePreview && allAreImages ? (
                  <img
                    src={preview}
                    alt={`Preview ${idx}`}
                    className={styles["preview-image"]}
                  />
                ) : (
                  <p>{file.name}</p>
                )}
                <ButtonIcon
                  className={clsx(
                    isImagePreview && allAreImages
                      ? styles["image-remove-button"]
                      : styles["file-remove-button"]
                  )}
                  icon="x"
                  label={`Eliminar archivo ${file.name}`}
                  size="small"
                  type="button"
                  variant="secondary"
                  onClick={() => handleRemoveFile(idx)}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default DragAndDrop;

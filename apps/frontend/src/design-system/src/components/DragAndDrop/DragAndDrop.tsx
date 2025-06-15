import { useState, useEffect, useCallback } from "react";

import Icon from "../Icon";
import FilePreviews from "./FilePreviews";
import ButtonIcon from "../ButtonIcon";
import type { DragAndDropProps } from "./DragAndDrop.types";
import { iconSizeMap } from "../Icon";

import { processFiles } from "./DragAndDrop.utils";

import clsx from "clsx";
import styles from "./DragAndDrop.module.scss";
import buttonStyles from "../Button/Button.module.scss";

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
  showFilePreviews,
  showSingleImagePreview,
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
  const multiple = maxFileAmount !== 1;

  const shouldShowSingleImagePreview =
    showSingleImagePreview &&
    value.length === 1 &&
    maxFileAmount === 1 &&
    accept?.includes("image/") &&
    previews.length === 1;

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

  function getLabelText() {
    if (isDragging && value.length === 0) return boxLabelDragging;

    if (!isDragging) {
      if (value.length === 1 && maxFileAmount === 1) {
        return value[0].name;
      }

      if (value.length > 0) {
        const plural = value.length !== 1;
        return `${value.length} archivo${plural ? "s" : ""} seleccionado${
          plural ? "s" : ""
        }`;
      }
    }

    return boxLabelInitial;
  }

  function getSecondaryButtonText() {
    return value.length === 1
      ? "Borrar archivo seleccionado"
      : "Borrar archivos seleccionados";
  }

  const handleFiles = useCallback(
    (files: FileList) => {
      const { acceptedFiles, errors } = processFiles({
        files,
        currentValue: value,
        accept,
        maxFileSize,
        maxFileAmount,
        multiple,
      });

      setValidationErrors(errors);
      onValidationError?.(errors);

      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles);
      }
    },
    [
      accept,
      maxFileSize,
      maxFileAmount,
      multiple,
      onChange,
      onValidationError,
      value,
    ]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.target.files) {
      handleFiles(e.target.files);
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

  const handleRemoveFile = useCallback(
    (index: number) => {
      if (disabled) return;
      const newFiles = value.filter((_, i) => i !== index);
      onChange(newFiles);
    },
    [disabled, value, onChange]
  );

  return (
    <>
      {shouldShowSingleImagePreview ? (
        <div
          className={clsx(
            styles["drop-zone"],
            styles["single-image-preview"],
            className
          )}
        >
          <img
            src={previews[0]}
            alt="Previsualización del archivo"
            className={styles["image-preview"]}
          />
          <ButtonIcon
            className={styles["remove-button"]}
            icon="X"
            label="Quitar imagen"
            variant="secondary"
            size="small"
            onClick={() => onChange([])}
          />
        </div>
      ) : (
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

          {!showFilePreviews && value.length >= 1 && (
            <div className={styles["inline-preview"]}>
              <p className={styles.message}>{getLabelText()}</p>
              <ButtonIcon
                label={getSecondaryButtonText()}
                icon="X"
                size="small"
                variant="secondary"
                onClick={() => onChange([])}
              />
            </div>
          )}

          {helper && <p className={styles.message}>{helper}</p>}

          {validationErrors.map((error, i) => (
            <p
              key={i}
              className={clsx(styles.message, styles["error-message"])}
            >
              {error}
            </p>
          ))}
          {error && (
            <p className={clsx(styles.message, styles["error-message"])}>
              {error}
            </p>
          )}
        </div>
      )}
      {/* <div
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

        {!showFilePreviews && value.length >= 1 && (
          <div className={styles["inline-preview"]}>
            <p className={styles.message}>{getLabelText()}</p>
            <ButtonIcon
              label={getSecondaryButtonText()}
              icon="X"
              size="small"
              variant="secondary"
              onClick={() => onChange([])}
            />
          </div>
        )}

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
      </div> */}

      {showFilePreviews && previews.length === value.length && (
        <FilePreviews
          inline={inline}
          previews={previews}
          value={value}
          handleRemoveFile={handleRemoveFile}
        />
      )}
    </>
  );
};
export default DragAndDrop;

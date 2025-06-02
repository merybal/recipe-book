import { useState, useEffect, useCallback, InputHTMLAttributes } from "react";

import ButtonIcon from "./ButtonIcon";
import Icon from "./Icon";
import { IconName } from "./Icons";

import type { ButtonProps } from "./Button";
import { iconSizeMap } from "@/constants";

import clsx from "clsx";
import styles from "./DragAndDrop.module.scss";
import buttonStyles from "./Button.module.scss";

export type DragAndDropProps = {
  accept?: string;
  boxIcon?: IconName;
  boxLabelInitial?: string;
  boxLabelDragging?: string;
  buttonLabel?: string;
  buttonClassName?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  helper?: string;
  inline?: boolean;
  value: File[];
  onChange: (files: File[]) => void;
} & Pick<
  ButtonProps,
  "disruptive" | "iconLeft" | "iconRight" | "size" | "variant"
> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">;

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
  multiple,
  size = "medium",
  value = [],
  variant = "primary",
  onChange,
  ...rest
}: DragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const pixelSize = iconSizeMap[size];

  useEffect(() => {
    console.log("previews actualizados:", previews);
  }, [previews]);

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
      const newFiles = Array.from(files);

      if (multiple) {
        onChange([...value, ...newFiles]);
      } else {
        onChange(newFiles);
      }
    },
    [value, onChange, multiple]
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
        {helper && !error && <p className={styles.message}>{helper}</p>}
        {error && (
          <p className={clsx(styles.message, styles["error-message"])}>
            {error}
          </p>
        )}
      </div>

      {value.length > 0 && (
        <div className={styles.previewList}>
          {value.length > 0 && (
            <div className={styles.previewList}>
              {value.map((file, idx) => {
                const preview = previews[idx];
                const isImagePreview =
                  typeof preview === "string" &&
                  (preview.startsWith("blob:") || preview.startsWith("data:"));

                return (
                  <div className={styles.previewText} key={idx}>
                    {!isImagePreview && <Icon name="file" size={pixelSize} />}
                    {isImagePreview ? (
                      <img
                        src={preview}
                        alt={`Preview ${idx}`}
                        className={styles.previewImage}
                      />
                    ) : preview && preview.startsWith("Archivo:") ? (
                      <p>{preview}</p>
                    ) : (
                      <pre>{preview}</pre>
                    )}
                    <ButtonIcon
                      disabled={disabled}
                      label={`Eliminar archivo ${file.name}`}
                      icon="x"
                      size="small"
                      variant="secondary"
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default DragAndDrop;

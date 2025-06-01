import { useState, useCallback, InputHTMLAttributes } from "react";

import Icon from "./Icon";
import { IconName } from "./Icons";

import type { ButtonProps } from "./Button";
import { iconSizeMap } from "@/constants";

import clsx from "clsx";
import styles from "./DragAndDrop.module.scss";
import buttonStyles from "./Button.module.scss";

type DragAndDropProps = {
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
  uploadedFileIcon?: IconName;
  onFileSelect: (files: FileList) => void;
} & Pick<
  ButtonProps,
  "disruptive" | "iconLeft" | "iconRight" | "size" | "variant"
> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

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
  uploadedFileIcon,
  variant = "primary",
  onFileSelect,
  ...rest
}: DragAndDropProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const pixelSize = iconSizeMap[size];

  const processFiles = (files: FileList) => {
    const urls: string[] = [];

    Array.from(files).forEach((file) => {
      const type = file.type;

      if (type.startsWith("image/")) {
        urls.push(URL.createObjectURL(file));
      } else if (type.startsWith("text/")) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setPreviews((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsText(file);
      } else {
        urls.push(`Archivo: ${file.name}`);
      }
    });

    if (urls.length > 0) {
      setPreviews((prev) => [...prev, ...urls]);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      onFileSelect(files);
      processFiles(files);
    },
    [onFileSelect]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files);
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <>
      <div
        className={clsx(
          styles["drop-zone"],
          { [styles["full-width"]]: !inline },
          { [styles["drag-over"]]: isDragging },
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

      {previews.length > 0 && (
        <div className={styles.previewList}>
          {previews.map((item, idx) =>
            item.startsWith("data:") || item.startsWith("blob:") ? (
              <img
                key={idx}
                src={item}
                alt={`Preview ${idx}`}
                className={styles.previewImage}
              />
            ) : item.startsWith("Archivo:") ? (
              <div className={styles.previewText}>
                {uploadedFileIcon && (
                  <Icon name={uploadedFileIcon} size={pixelSize} />
                )}
                <p key={idx}>{item}</p>
              </div>
            ) : (
              <div className={styles.previewText}>
                {uploadedFileIcon && (
                  <Icon name={uploadedFileIcon} size={pixelSize} />
                )}
                <pre key={idx}>{item}</pre>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default DragAndDrop;

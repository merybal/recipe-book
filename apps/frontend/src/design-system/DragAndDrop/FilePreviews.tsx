import type { FilePreviewsProps } from "./DragAndDrop.types";

import Icon from "../Icon";
import ButtonIcon from "../ButtonIcon";

import clsx from "clsx";
import styles from "./DragAndDrop.module.scss";

const FilePreviews = ({
  inline,
  previews,
  value,
  handleRemoveFile,
}: FilePreviewsProps) => {
  const allAreImages = previews.every(
    (preview) =>
      typeof preview === "string" &&
      (preview.startsWith("blob:") || preview.startsWith("data:"))
  );

  return (
    <>
      {value.length > 0 && (
        <div
          className={clsx(
            styles["preview-list"],
            allAreImages && styles["row-layout"],
            !inline && styles["full-width"]
          )}
        >
          {value.map((file, idx) => {
            const preview = previews[idx];

            if (!preview) return null;

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
                {!allAreImages && <Icon name="File" size="sm" />}
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
                  icon="X"
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

export default FilePreviews;

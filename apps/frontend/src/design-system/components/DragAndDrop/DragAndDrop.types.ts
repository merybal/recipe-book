import { InputHTMLAttributes } from "react";
import type { ButtonProps } from "../Button";
import { IconName } from "../Icon";

export type DragAndDropProps = {
  /**
   * Accepted file types
   */
  accept?: string;
  /**
   * Icon displayed in DragAndDrop box
   */
  boxIcon?: IconName;
  /**
   * Label shown in initial state (nothing uploaded).
   * @default "Arrastrá un archivo acá o"
   */
  boxLabelInitial?: string;
  /**
   * Label shown when file is being dragged into box.
   * @default "Soltá el archivo acá"
   */
  boxLabelDragging?: string;
  /**
   * Box button label
   * @default "Busca en tu PC"
   */
  buttonLabel?: string;
  /**
   * Box button classname
   */
  /** Extra CSS class for the inner button. */
  buttonClassName?: string;
  /** Extra CSS class applied to the drop zone. */
  className?: string;
  /** When true, the drop zone is disabled. */
  disabled?: boolean;
  /**
   * Error message passed from parent element, for submit event
   */
  error?: string;
  /**
   * Helper message shown inside the box below the button
   */
  helper?: string;
  /**
   * Inline DragAndDrop will have a fixed width of 20rem, otherwise it will have width: 100%
   */
  inline?: boolean;
  /**
   * Maximum amount of files allowed.
   */
  maxFileAmount?: number;
  /**
   * Maximum file size in bytes.
   */
  maxFileSize?: number;
  /**
   * When true, displays a preview of the uploaded files below the box.
   */
  showFilePreviews?: boolean;
  /**
   * When true, displays the image preview in the box. Only works if maxFileAmount=1 and accept includes "image/*".
   */
  showSingleImagePreview?: boolean;
  /**
   * Current list of uploaded files.
   * @default []
   */
  value: File[];
  /** Called when files change (new list). */
  onChange: (files: File[]) => void;
  /** Called when validation fails (e.g. wrong type or size); receives error messages. */
  onValidationError?: (errors: string[]) => void;
} & Pick<
  ButtonProps,
  "disruptive" | "iconLeft" | "iconRight" | "size" | "variant"
> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">;

export type FilePreviewsProps = {
  /** When true, uses inline layout (fixed width). */
  inline?: boolean;
  /** Preview URLs or labels for each file. */
  previews: string[];
  /** Current list of uploaded files. */
  value: File[];
  /** Called when the user removes a file at the given index. */
  handleRemoveFile: (index: number) => void;
};

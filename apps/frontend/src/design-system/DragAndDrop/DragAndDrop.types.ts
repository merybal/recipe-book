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
   * Label shown in inital state (nothing uploaded)
   * @default "Arrastrá un archivo acá o"
   */
  boxLabelInitial?: string;
  /**
   * Label shown when file is being dragged into box
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
  buttonClassName?: string;
  className?: string;
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
   * Maximun amount of files allowed
   */
  maxFileAmount?: number;
  /**
   * Maximun file size
   */
  maxFileSize?: number; // bytes
  /**
   * Files uploaded
   * @default []
   */
  value: File[];
  onChange: (files: File[]) => void;
  onValidationError?: (errors: string[]) => void;
} & Pick<
  ButtonProps,
  "disruptive" | "iconLeft" | "iconRight" | "size" | "variant"
> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">;

export type FilePreviewsProps = {
  /**
   * Is DragAndDropInline
   */
  inline?: boolean;
  /**
   * File previews
   */
  previews: string[];
  /**
   * Files uploaded
   * @default []
   */
  value: File[];
  handleRemoveFile: (index: number) => void;
};

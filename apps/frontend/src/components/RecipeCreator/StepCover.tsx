import DragAndDrop from "@/design-system/src/components/DragAndDrop";
import Input from "@/design-system/src/components/Input";

import type { RecipeStateType, ErrorStateType } from "@/types";

import { useIsMobile } from "@/hooks/useIsMobile";
import { validateTitle } from "@/utils/form-validation-utils";

import styles from "./RecipeForm.module.scss";

type StepCoverProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
} & RecipeStateType &
  ErrorStateType;

const StepCover = ({
  errors,
  files,
  recipe,
  setErrors,
  setFiles,
  setRecipe,
}: StepCoverProps) => {
  const isMobile = useIsMobile();

  const getBoxLabelInitial = isMobile
    ? "Agrega la imagen de portada"
    : "Agrega la imagen de portada acá o";

  const getButtonLabelDragAndDrop = isMobile
    ? "Elegí una imagen"
    : "Seleccionála desde tu PC";

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setRecipe((prev) => ({
      ...prev,
      title: value,
    }));

    const error = validateTitle(value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors.title = error;
      else delete newErrors.title;
      return newErrors;
    });
  };

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipe((prev) => ({
      ...prev,
      servings: value,
    }));
  };

  return (
    <div className={styles.step}>
      <h2>Portada</h2>
      <DragAndDrop
        accept="image/*"
        boxIcon="Image"
        boxLabelInitial={getBoxLabelInitial}
        buttonLabel={getButtonLabelDragAndDrop}
        maxFileAmount={1}
        showSingleImagePreview
        value={files}
        onChange={handleFileChange}
      />

      <Input
        id="title"
        label="Titulo"
        required
        showLabel
        placeholder="Tarta de manzana"
        value={recipe.title}
        onChange={handleTitleChange}
        {...(errors.title && { error: errors.title })}
      />

      <Input
        id="servings"
        label="Rinde"
        showLabel
        placeholder="4 porciones"
        value={recipe.servings}
        onChange={handleServingsChange}
      />
    </div>
  );
};

export default StepCover;

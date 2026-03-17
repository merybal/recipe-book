import DragAndDrop from "@/design-system/components/DragAndDrop";
import Input from "@/design-system/components/Input";
import Separator from "@/design-system/components/Separator";

import type { RecipeStateType, ErrorStateType } from "@/types";

import { useIsMobile } from "@/hooks/useIsMobile";
import { validateTitle } from "@/utils/form-validation-utils";

import styles from "@/features/RecipeCreator/CreateRecipeView.module.scss";

type CoverStepProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
} & RecipeStateType &
  ErrorStateType;

const CoverStep = ({
  errors,
  files,
  recipe,
  setErrors,
  setFiles,
  setRecipe,
}: CoverStepProps) => {
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

  const authorValue = recipe.source?.name?.[0] ?? "";
  const linkValue = recipe.source?.url?.[0] ?? "";

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipe((prev) => ({
      ...prev,
      source: {
        ...(prev.source ?? {}),
        name: value ? [value] : [],
      },
    }));
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipe((prev) => ({
      ...prev,
      source: {
        ...(prev.source ?? {}),
        url: value ? [value] : [],
      },
    }));
  };

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe((prev) => ({
      ...prev,
      servings: e.target.value,
    }));
  };

  return (
    <div>
      <section aria-labelledby="cover-section" className={styles.step}>
        <h2 id="cover-section">Portada</h2>
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
          value={recipe.servings ?? ""}
          onChange={handleServingsChange}
        />
      </section>

      <Separator />

      <section aria-labelledby="source-section" className={styles.step}>
        <h2 id="source-section">Fuente</h2>
        <Input
          id="author"
          label="Autor"
          showLabel
          placeholder="Laura Bolomo"
          value={authorValue}
          onChange={handleAuthorChange}
        />

        <Input
          id="source-link"
          label="Link a la receta original"
          showLabel
          placeholder="https://ejemplo.com/receta"
          type="url"
          value={linkValue}
          onChange={handleLinkChange}
        />
      </section>
    </div>
  );
};

export default CoverStep;

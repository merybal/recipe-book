import clsx from "clsx";
import Box from "@/design-system/components/Box";
import DragAndDrop from "@/design-system/components/DragAndDrop";
import Button from "@/design-system/components/Button";
import ButtonIcon from "@/design-system/components/ButtonIcon";
import Input from "@/design-system/components/Input";
import Textarea from "@/design-system/components/Textarea";
import Separator from "@/design-system/components/Separator";

import type { RecipeStateType, ErrorStateType } from "@/types";

import { useIsMobile } from "@/hooks/useIsMobile";
import { validateTitle } from "@/utils/form-validation-utils";

import styles from "@/features/RecipeCreator/CreateRecipeView.module.scss";

const MAX_SOURCES = 6;

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
    if (newFiles.length === 0) {
      setRecipe((prev) => ({ ...prev, imageUrl: undefined }));
    }
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

  const authors = recipe.source?.name ?? [];
  const links = recipe.source?.url ?? [];
  const sourceCount = Math.max(
    authors.length || 1,
    links.length || 1,
    1,
  );
  const sourcesToShow = Array.from({ length: sourceCount }, (_, i) => ({
    author: authors[i] ?? "",
    link: links[i] ?? "",
  }));

  const handleSourceChange = (
    index: number,
    field: "author" | "link",
    value: string,
  ) => {
    setRecipe((prev) => {
      const names = [...(prev.source?.name ?? [])];
      const urls = [...(prev.source?.url ?? [])];
      while (names.length <= index) names.push("");
      while (urls.length <= index) urls.push("");
      if (field === "author") names[index] = value;
      else urls[index] = value;
      return {
        ...prev,
        source: { name: names, url: urls },
      };
    });
  };

  const handleAddSource = () => {
    setRecipe((prev) => {
      const names = [...(prev.source?.name ?? [])];
      const urls = [...(prev.source?.url ?? [])];
      const len = Math.max(names.length, urls.length, 1);
      if (len >= MAX_SOURCES) return prev;
      const nextNames = [...names];
      const nextUrls = [...urls];
      while (nextNames.length < len) nextNames.push("");
      while (nextUrls.length < len) nextUrls.push("");
      nextNames.push("");
      nextUrls.push("");
      return {
        ...prev,
        source: { name: nextNames, url: nextUrls },
      };
    });
  };

  const handleRemoveSource = (index: number) => {
    setRecipe((prev) => {
      const names = (prev.source?.name ?? []).filter((_, i) => i !== index);
      const urls = (prev.source?.url ?? []).filter((_, i) => i !== index);
      return {
        ...prev,
        source:
          names.length > 0 || urls.length > 0
            ? { name: names, url: urls }
            : undefined,
      };
    });
  };

  const handleIntroductionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecipe((prev) => ({
      ...prev,
      introduction: e.target.value,
    }));
  };

  return (
    <div>
      <section aria-labelledby="cover-section" className={styles.step}>
        <h2 id="cover-section">Portada</h2>
        <Box className={styles["cover-step-grid"]}>
          <DragAndDrop
            accept="image/*"
            boxIcon="Image"
            boxLabelInitial={getBoxLabelInitial}
            buttonLabel={getButtonLabelDragAndDrop}
            maxFileAmount={1}
            showSingleImagePreview
            existingImageUrl={files.length === 0 ? recipe.imageUrl : undefined}
            value={files}
            onChange={handleFileChange}
          />

          <Box className={styles["cover-step-fields"]}>
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

            <Textarea
              id="introduction"
              label="Introducción"
              showLabel
              placeholder="Breve descripción o contexto de la receta..."
              rows={3}
              value={recipe.introduction ?? ""}
              onChange={handleIntroductionChange}
            />
          </Box>
        </Box>
      </section>

      <Separator />

      <section aria-labelledby="source-section" className={styles.step}>
        <h2 id="source-section">Fuente</h2>
        <div className={styles["notes-container"]}>
          <div className={styles["source-subsection"]}>
            {sourcesToShow.map((source, index) => (
              <div
                key={`source-${index}`}
                className={clsx(
                  styles["source-row"],
                  index === 0 && styles["source-row--first"]
                )}
              >
                <Input
                  id={`source-author-${index}`}
                  label="Autor"
                  showLabel={false}
                  placeholder="Laura Bolomo"
                  value={source.author}
                  onChange={(e) =>
                    handleSourceChange(index, "author", e.target.value)
                  }
                />
                <Input
                  id={`source-link-${index}`}
                  label="Link a receta original"
                  showLabel={false}
                  placeholder="https://ejemplo.com/receta"
                  type="url"
                  value={source.link}
                  onChange={(e) =>
                    handleSourceChange(index, "link", e.target.value)
                  }
                />
                {sourcesToShow.length > 1 && (
                  <ButtonIcon
                    className={styles["note-remove-button"]}
                    disruptive
                    icon="Trash2"
                    label="Eliminar fuente"
                    size="small"
                    variant="secondary"
                    onClick={() => handleRemoveSource(index)}
                  />
                )}
              </div>
            ))}
            {sourcesToShow.length < MAX_SOURCES && (
              <Button
                type="button"
                label="Agregar fuente"
                iconLeft="Plus"
                variant="secondary"
                onClick={handleAddSource}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoverStep;

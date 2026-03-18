import clsx from "clsx";
import DragAndDrop from "@/design-system/components/DragAndDrop";
import Button from "@/design-system/components/Button";
import ButtonIcon from "@/design-system/components/ButtonIcon";
import Input from "@/design-system/components/Input";
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
  const authorsToShow = authors.length > 0 ? authors : [""];
  const linksToShow = links.length > 0 ? links : [""];

  const handleAuthorChange = (index: number, value: string) => {
    setRecipe((prev) => {
      const next = [...(prev.source?.name ?? [])];
      while (next.length <= index) next.push("");
      next[index] = value;
      return {
        ...prev,
        source: { ...(prev.source ?? {}), name: next },
      };
    });
  };

  const handleAddAuthor = () => {
    setRecipe((prev) => {
      const current = prev.source?.name ?? [];
      const next =
        current.length === 0 ? ["", ""] : [...current, ""];
      if (next.length > MAX_SOURCES) return prev;
      return {
        ...prev,
        source: { ...(prev.source ?? {}), name: next },
      };
    });
  };

  const handleRemoveAuthor = (index: number) => {
    setRecipe((prev) => {
      const nextNames = (prev.source?.name ?? []).filter((_, i) => i !== index);
      const urls = prev.source?.url ?? [];
      return {
        ...prev,
        source:
          nextNames.length > 0 || urls.length > 0
            ? { name: nextNames, url: urls }
            : undefined,
      };
    });
  };

  const handleLinkChange = (index: number, value: string) => {
    setRecipe((prev) => {
      const next = [...(prev.source?.url ?? [])];
      while (next.length <= index) next.push("");
      next[index] = value;
      return {
        ...prev,
        source: { ...(prev.source ?? {}), url: next },
      };
    });
  };

  const handleAddLink = () => {
    setRecipe((prev) => {
      const current = prev.source?.url ?? [];
      const next =
        current.length === 0 ? ["", ""] : [...current, ""];
      if (next.length > MAX_SOURCES) return prev;
      return {
        ...prev,
        source: { ...(prev.source ?? {}), url: next },
      };
    });
  };

  const handleRemoveLink = (index: number) => {
    setRecipe((prev) => {
      const names = prev.source?.name ?? [];
      const nextUrls = (prev.source?.url ?? []).filter((_, i) => i !== index);
      return {
        ...prev,
        source:
          names.length > 0 || nextUrls.length > 0
            ? { name: names, url: nextUrls }
            : undefined,
      };
    });
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
        <div className={styles["notes-container"]}>
          <div className={styles["source-subsection"]}>
            <h3 className={styles["source-subsection-title"]}>
              {authorsToShow.length === 1 ? "Autor" : "Autores"}
            </h3>
            {authorsToShow.map((author, index) => (
              <div
                key={`author-${index}`}
                className={clsx(
                  styles["note-item"],
                  index === 0 && styles["note-item--first"]
                )}
              >
                <Input
                  id={`source-author-${index}`}
                  label={authorsToShow.length === 1 ? "Autor" : "Autores"}
                  showLabel={false}
                  placeholder="Laura Bolomo"
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                />
                {authorsToShow.length > 1 && (
                  <ButtonIcon
                    className={styles["note-remove-button"]}
                    disruptive
                    icon="Trash2"
                    label="Eliminar autor"
                    size="small"
                    variant="secondary"
                    onClick={() => handleRemoveAuthor(index)}
                  />
                )}
              </div>
            ))}
            {authorsToShow.length < MAX_SOURCES && (
              <Button
                type="button"
                label="Agregar autor"
                iconLeft="Plus"
                variant="secondary"
                onClick={handleAddAuthor}
              />
            )}
          </div>
          <div className={styles["source-subsection"]}>
            <h3 className={styles["source-subsection-title"]}>
              {linksToShow.length === 1
                ? "Link a receta original"
                : "Links a recetas originales"}
            </h3>
            {linksToShow.map((link, index) => (
              <div
                key={`link-${index}`}
                className={clsx(
                  styles["note-item"],
                  index === 0 && styles["note-item--first"]
                )}
              >
                <Input
                  id={`source-link-${index}`}
                  label={
                    linksToShow.length === 1
                      ? "Link a receta original"
                      : "Links a recetas originales"
                  }
                  showLabel={false}
                  placeholder="https://ejemplo.com/receta"
                  type="url"
                  value={link ?? ""}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                />
                {linksToShow.length > 1 && (
                  <ButtonIcon
                    className={styles["note-remove-button"]}
                    disruptive
                    icon="Trash2"
                    label="Eliminar link"
                    size="small"
                    variant="secondary"
                    onClick={() => handleRemoveLink(index)}
                  />
                )}
              </div>
            ))}
            {linksToShow.length < MAX_SOURCES && (
              <Button
                type="button"
                label="Agregar link"
                iconLeft="Plus"
                variant="secondary"
                onClick={handleAddLink}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoverStep;

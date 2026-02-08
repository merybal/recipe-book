import { useEffect, useState } from "react";
import type { RecipeType } from "@/types";

import clsx from "clsx";
import styles from "./RecipePreview.module.scss";
import Separator from "@/design-system/components/Separator";
import ButtonIcon from "@/design-system/components/ButtonIcon";

export type RecipePreviewProps = {
  className?: string;
  recipeData: RecipeType;
  onChange: (updatedRecipe: RecipeType) => void;
  /** Imagen de portada cargada en el step 1 (para previsualizar/cambiar en el preview). */
  coverImageFiles?: File[];
  /** Se llama cuando el usuario cambia la imagen de portada desde el preview. */
  onCoverImageChange?: (files: File[]) => void;
  /** Se llama al pulsar "Editar portada"; típicamente para ir al step 0 del formulario. */
  onEditCover?: () => void;
  /** Se llama al pulsar "Editar subrecetas"; típicamente para ir al step 4 del formulario. */
  onEditSubrecipes?: () => void;
  /** Se llama al pulsar "Editar cocción"; típicamente para ir al step 2 del formulario. */
  onEditBakingInstructions?: () => void;
  /** Se llama al pulsar "Editar molde"; típicamente para ir al step 1 del formulario. */
  onEditMold?: () => void;
};

const RecipePreview = ({
  className,
  recipeData,
  onChange,
  coverImageFiles = [],
  onEditCover,
  onEditSubrecipes,
  onEditBakingInstructions,
  onEditMold,
}: RecipePreviewProps) => {
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const file = coverImageFiles[0];
    if (!file) {
      setCoverPreviewUrl(null);
      return () => {};
    }
    const url = URL.createObjectURL(file);
    setCoverPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [coverImageFiles]);

  // Solo la imagen cargada en el step 0 (portada), no recipeData.imageUrl
  const coverImageSrc = coverPreviewUrl ?? undefined;

  return (
    <div className={clsx(styles["recipe-preview"], className)}>
      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Portada</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar portada"
            size="small"
            onClick={() => onEditCover?.()}
          />
        </div>
        {coverImageSrc && (
          <div className={styles["recipe-image"]}>
            <img src={coverImageSrc} alt={recipeData.title} />
          </div>
        )}
        <div>
          <h3>Título</h3>
          <p>{recipeData.title}</p>
        </div>
        <div>
          <h3>Rinde</h3>
          <p>{recipeData.servings ? recipeData.servings : "-"}</p>
        </div>
      </div>

      <Separator />

      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Molde</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar molde"
            size="small"
            onClick={() => onEditMold?.()}
          />
        </div>
        <div>
          <h3>Tipo</h3>
          <p>{recipeData.mold?.type ? recipeData.mold?.type : "-"}</p>
        </div>
        <div>
          <h3>Tamaño</h3>
          <p>{recipeData.mold?.size ? recipeData.mold?.size : "-"}</p>
        </div>
      </div>

      <Separator />

      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Cocción</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar cocción"
            size="small"
            onClick={() => onEditBakingInstructions?.()}
          />
        </div>
        <div>
          <h3>Temperatura</h3>
          <p>
            {recipeData.bakingInstructions?.temperature
              ? recipeData.bakingInstructions?.temperature
              : "-"}
          </p>
        </div>
        <div>
          <h3>Tiempo</h3>
          <p>
            {recipeData.bakingInstructions?.time
              ? recipeData.bakingInstructions?.time
              : "-"}
          </p>
        </div>
      </div>

      <Separator />

      <div className={styles.step}>
        <div className={styles["step-header"]}>
          <h2>Preparación</h2>
          <ButtonIcon
            icon="Pencil"
            label="Editar preparación"
            size="small"
            onClick={() => onEditSubrecipes?.()}
          />
        </div>
        <div>
          <h3>Título</h3>
          <p>
            {recipeData.subrecipes[0].title
              ? recipeData.subrecipes[0].title
              : "-"}
          </p>
        </div>
        <div>
          <h3>Ingredientes</h3>
          <p>
            {recipeData.subrecipes[0].ingredients
              .map((ingredient) => ingredient.name)
              .join(", ")
              ? recipeData.subrecipes[0].ingredients
                  .map((ingredient) => ingredient.name)
                  .join(", ")
              : "-"}
          </p>
        </div>
        <div>
          <h3>Instrucciones</h3>
          <p>
            {recipeData.subrecipes[0].instructions.join(", ")
              ? recipeData.subrecipes[0].instructions.join(", ")
              : "-"}
          </p>
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default RecipePreview;

import { useState, useEffect } from "react";

import ButtonIcon from "@/design-system/src/components/ButtonIcon";
import Input from "@/design-system/src/components/Input";

import type { RecipeType } from "@/types";

import clsx from "clsx";
import styles from "./RecipePreview.module.scss";
import EditableInput from "../../design-system/src/components/EditableInput/EditableInput";

export type RecipePreviewProps = {
  className?: string;
  recipeData: RecipeType;
  onChange: (updatedRecipe: RecipeType) => void;
};

const RecipePreview = ({
  className,
  recipeData,
  onChange,
}: RecipePreviewProps) => {
  return (
    <div className={clsx(styles["recipe-preview"], className)}>
      <EditableInput
        id="title-input"
        label="Titulo"
        required
        value={recipeData.title}
        onChange={(newTitle) => onChange({ ...recipeData, title: newTitle })}
      />

      <EditableInput
        id="serves-input"
        label="Rinde (porciones)"
        value={recipeData.servings ?? ""}
        onChange={(newValue) => onChange({ ...recipeData, servings: newValue })}
      />

      <EditableInput
        id="mold-type-input"
        label="Tipo de molde"
        value={recipeData.mold?.type ?? ""}
        onChange={(newValue) =>
          onChange({
            ...recipeData,
            mold: { ...recipeData.mold, type: newValue },
          })
        }
      />

      <EditableInput
        id="mold-size-input"
        label="Tamaño del molde"
        value={recipeData.mold?.size ?? ""}
        onChange={(newValue) =>
          onChange({
            ...recipeData,
            mold: { ...recipeData.mold, size: newValue },
          })
        }
      />

      <EditableInput
        id="temperature-input"
        label="Temperatura de horneado en Celcius (°C)"
        type="number"
        value={recipeData.bakingInstructions?.temperature?.toString() ?? ""}
        onChange={(newValue) =>
          onChange({
            ...recipeData,
            bakingInstructions: {
              ...recipeData.bakingInstructions,
              temperature: parseInt(newValue, 10),
            },
          })
        }
      />

      <EditableInput
        id="cooking-time-input"
        label="Tiempo de horneado en minutos"
        type="number"
        value={recipeData.bakingInstructions?.time?.toString() ?? ""}
        onChange={(newValue) =>
          onChange({
            ...recipeData,
            bakingInstructions: {
              ...recipeData.bakingInstructions,
              time: parseInt(newValue, 10),
            },
          })
        }
      />
    </div>
  );
};

export default RecipePreview;

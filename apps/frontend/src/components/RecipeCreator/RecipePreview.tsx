import { useState, useEffect } from "react";

import ButtonIcon from "@/design-system/ButtonIcon";
import Input from "@/design-system/Input";

import type { RecipeType } from "@/types";

import clsx from "clsx";
import styles from "./RecipePreview.module.scss";
import EditableInput from "../../design-system/EditableInput/EditableInput";

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
        label="Titulo"
        required
        value={recipeData.title}
        onChange={(newTitle) => onChange({ ...recipeData, title: newTitle })}
      />

      <EditableInput
        label="Rinde (porciones)"
        value={recipeData.servings ?? ""}
        onChange={(newValue) => onChange({ ...recipeData, servings: newValue })}
      />

      <EditableInput
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

import { useState, useEffect } from "react";
import axios from "axios";

import { useLocale } from "@/hooks/useLocale";
import DragAndDrop from "@/design-system/components/DragAndDrop";
import Button from "@/design-system/components/Button";
import RecipePreview from "./RecipePreview";

import styles from "./IdmlFileUploader.module.scss";

import {
  parseIdmlFile,
  transformRecipeForPost,
} from "@/utils/idml-file-uploader-utils";

import type { RecipeType, DietaryRestrictionRaw, UnitRaw } from "@/types";

// TODO create select input for use in ingredients table
// TODO create checkbox

const IdmlFileUploader = () => {
  const locale = useLocale();
  const [units, setUnits] = useState<UnitRaw[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<
    DietaryRestrictionRaw[]
  >([]);
  const [recipe, setRecipe] = useState<RecipeType>();
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (recipe) {
      console.log("La receta cambió:", recipe);
    }
  }, [recipe]);

  useEffect(() => {
    if (files.length === 0) {
      setRecipe(undefined);
    }
  }, [files]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitsRes, restrictionsRes] = await Promise.all([
          axios.get(`/api/units?locale=${locale}`),
          axios.get("/api/dietary-restrictions"),
        ]);

        setUnits(unitsRes.data);
        setDietaryRestrictions(restrictionsRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [locale]);

  const handleFileChange = async (newFiles: File[]) => {
    setFiles(newFiles);

    let u = units;
    if (u.length === 0) {
      const res = await axios.get<UnitRaw[]>(`/api/units?locale=${locale}`);
      u = res.data;
      setUnits(u);
    }

    const recipe = await parseIdmlFile(newFiles[0], u);
    if (recipe) {
      setRecipe(recipe);
    }
  };

  const handleUpload = async () => {
    if (!recipe) return;

    const body = transformRecipeForPost(
      recipe,
      units,
      dietaryRestrictions,
    );

    try {
      const res = await axios.post("/api/recipes", body);
      console.log("Receta subida con éxito:", res.data);
    } catch (error) {
      console.error("Error al subir la receta:", error);
    }
  };

  return (
    <div className={styles["file-upload"]}>
      <DragAndDrop
        accept=".idml"
        boxLabelInitial="Arrastrá tu archivo IDML acá o"
        buttonLabel="Seleccionálo desde tu PC"
        maxFileAmount={1}
        showFilePreviews={false}
        value={files}
        onChange={handleFileChange}
      />

      {recipe && (
        <RecipePreview
          recipeData={recipe}
          onChange={(updatedRecipe) => setRecipe(updatedRecipe)}
        />
      )}

      <Button label="Post recipe" onClick={handleUpload} />
    </div>
  );
};

export default IdmlFileUploader;

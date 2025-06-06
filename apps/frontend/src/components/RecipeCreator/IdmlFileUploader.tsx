import { useState, useEffect } from "react";
import axios from "axios";

import DragAndDrop from "@/design-system/DragAndDrop";
import Button from "@/design-system/Button";
import RecipePreview from "./RecipePreview";

import styles from "./IdmlFileUploader.module.scss";

import {
  parseIdmlFile,
  transformRecipeForPost,
} from "@/utils/idml-file-uploader-utils";

import type { RecipeType, FoodAllergyRaw, UnitRaw } from "@/types";

const IdmlFileUploader = () => {
  const [units, setUnits] = useState<UnitRaw[]>([]);
  const [allergies, setAllergies] = useState<FoodAllergyRaw[]>([]);
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
        const [unitsRes, allergiesRes] = await Promise.all([
          axios.get("/api/units"),
          axios.get("/api/food-allergies"),
        ]);

        setUnits(unitsRes.data);
        setAllergies(allergiesRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = async (newFiles: File[]) => {
    setFiles(newFiles);

    const recipe = await parseIdmlFile(newFiles[0]);
    if (recipe) {
      setRecipe(recipe);
    }
  };

  const handleUpload = async () => {
    if (!recipe) return;

    const body = transformRecipeForPost(recipe, units, allergies);

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

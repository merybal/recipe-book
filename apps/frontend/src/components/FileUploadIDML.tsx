import { useState, useEffect } from "react";
// Docs: https://stuk.github.io/jszip/
import JSZip from "jszip";

import axios from "axios";

import DragAndDrop from "@/design-system/DragAndDrop";
import Button from "@/design-system/Button";

import styles from "./FileUpload.module.scss";

import Recipe from "@/pages/Recipe";

import {
  getBakingInstructions,
  getServings,
  getSubrecipesContent,
  getImageNamesFromIDML,
  parseIngredientLine,
  getMold,
  getNotes,
  getSource,
  getUnitId,
} from "@/utils/file-upload-idml-utils";

import type {
  RecipeType,
  FoodAllergyType,
  FoodAllergyRaw,
  SubrecipeIdmlType,
  UnitRaw,
} from "@/types";

const FileUploadIDML = () => {
  const [units, setUnits] = useState<UnitRaw[]>([]);
  const [allergies, setAllergies] = useState<FoodAllergyRaw[]>([]);
  const [recipe, setRecipe] = useState<RecipeType>();
  const [files, setFiles] = useState<File[]>([]);

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
      // console.log("units", units);
      // console.log("allergies", allergies);
    };

    fetchData();
  }, []);

  const handleFile = async () => {
    const recipeObject: RecipeType = {
      title: "",
      subrecipes: [],
    };

    const file = files?.[0];

    if (!file) return;

    const zip = await JSZip.loadAsync(file);
    const allergyTags = await getImageNamesFromIDML(zip);

    if (allergyTags.length) {
      recipeObject.foodAllergies = [];
      recipeObject.foodAllergies.push(...(allergyTags as FoodAllergyType[]));
    }

    const storyFiles = Object.keys(zip.files).filter((path) =>
      path.startsWith("Stories/")
    );

    for (const path of storyFiles) {
      // goes through xml files
      const content = await zip.files[path].async("text");
      // console.log("content", path, content);

      const parser = new DOMParser();
      const xml = parser.parseFromString(content, "application/xml");

      const paragraphs = xml.getElementsByTagName("ParagraphStyleRange");
      const storyContentArray = Array.from(paragraphs);

      // IDML paragraph styles
      const titleA = "h1a";
      const titleB = "h1b";
      const h2Left = "h2-left";
      const h3Left = "h3-left";
      const pLeft = "p-left";
      const h2Right = "h2-right";
      const h3Right = "h3-right";
      const pRight = "p-right";

      for (const [i, paragraph] of storyContentArray.entries()) {
        // goes through each of the files' content
        const style = paragraph.getAttribute("AppliedParagraphStyle");
        const text = paragraph.querySelector("Content")?.textContent?.trim();

        if (!text) continue;

        if (style?.includes(titleA || titleB)) {
          recipeObject.title = text;
        }

        if (style?.includes(h2Left)) {
          switch (text) {
            case "Ingredientes": {
              const subrecipes = getSubrecipesContent(
                i,
                storyContentArray,
                h2Left,
                h3Left,
                pLeft
              );

              const subrecipesArray = subrecipes.map(
                (subrecipe: SubrecipeIdmlType) => {
                  return {
                    title: subrecipe.sectionTitle,
                    ingredients: subrecipe.sectionBody.map(parseIngredientLine),
                    instructions: [],
                  };
                }
              );

              recipeObject.subrecipes = subrecipesArray;
              break;
            }

            case "Cocción":
              recipeObject.bakingInstructions = getBakingInstructions(
                i,
                storyContentArray
              );
              break;

            case "Molde":
              recipeObject.mold = getMold(i, storyContentArray);

              break;

            case "Rinde":
              recipeObject.servings = getServings(i, storyContentArray);

              break;

            default:
              break;
          }
        }

        if (style?.includes(h2Right)) {
          const subrecipes = getSubrecipesContent(
            i,
            storyContentArray,
            h2Right,
            h3Right,
            pRight
          );

          subrecipes.forEach((subrecipe) => {
            const match = recipeObject.subrecipes.find(
              (sub) => sub.title === subrecipe.sectionTitle
            );
            if (match) {
              // match.instructions = subrecipe.sectionBody.join("\n"); //TODO hacer solo en el post
              match.instructions = subrecipe.sectionBody;
            }
          });

          recipeObject.notes = getNotes(i, storyContentArray);
          getSource(i, storyContentArray, recipeObject);
        }
      }
    }
    console.log(recipeObject);
    setRecipe(recipeObject);
  };

  function transformRecipeForPost(
    recipe: RecipeType,
    units: UnitRaw[],
    allergies: FoodAllergyRaw[]
  ) {
    const formattedRecipe = {
      title: recipe.title,
      servings: recipe.servings,
      mold_type: recipe.mold?.type || null,
      mold_size: recipe.mold?.size || null,
      cooking_time: recipe.bakingInstructions?.time || null,
      cooking_temperature: recipe.bakingInstructions?.temperature || null,
      image_url: recipe.imageUrl || null,

      subrecipes: {
        create: recipe.subrecipes.map((sub) => ({
          title: sub.title || null,
          instructions: Array.isArray(sub.instructions)
            ? sub.instructions.join("\n")
            : sub.instructions,
          ingredients: {
            create: sub.ingredients.map((ing) => ({
              name: ing.name,
              amount: ing.amount ?? null,
              unit_id: getUnitId(ing.unit, units),
            })),
          },
        })),
      },

      recipe_food_allergies: {
        create: (recipe.foodAllergies ?? [])
          .map((name) => allergies.find((a) => a.name === name)?.id)
          .filter((id): id is number => !!id)
          .map((id) => ({ food_allergy_id: id })),
      },
    };

    console.log(formattedRecipe);

    return formattedRecipe;
  }

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
        maxFileAmount={1}
        value={files}
        onChange={setFiles}
      />
      <Button label="Submit" onClick={handleFile} />
      <Button label="Post recipe" onClick={handleUpload} />
    </div>
  );
};

export default FileUploadIDML;

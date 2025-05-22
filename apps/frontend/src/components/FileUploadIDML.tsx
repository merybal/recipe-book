import React, { useState } from "react";
import JSZip from "jszip";
// Docs: https://stuk.github.io/jszip/

import Recipe from "@/pages/Recipe";

import {
  getSectionContent,
  getSubSectionContent,
  getImageNamesFromIDML,
  parseIngredientList,
  getNotes,
  getSource,
} from "@/utils/file-upload-idml-utils";

import type { RecipeType } from "@/types/types";
import type { FoodAllergy } from "@/types/types";

const FileUploadIDML = () => {
  const [recipe, setRecipe] = useState<RecipeType>();

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const recipeObject: RecipeType = {
      title: "",
      instructions: [],
      ingredients: [],
      cookingTime: [],
      mold: [],
      serves: [],
      notes: [],
      source: {},
      foodAllergies: [],
    };

    const file = event.target.files?.[0];
    if (!file) return;

    const zip = await JSZip.loadAsync(file);
    const allergyTags = await getImageNamesFromIDML(zip);
    recipeObject?.foodAllergies?.push(...(allergyTags as FoodAllergy[]));

    const storyFiles = Object.keys(zip.files).filter((path) =>
      path.startsWith("Stories/")
    );

    for (const path of storyFiles) {
      //barre los archivos xlm
      const content = await zip.files[path].async("text");
      // console.log("content", path, content);

      const parser = new DOMParser();
      const xml = parser.parseFromString(content, "application/xml");

      const paragraphs = xml.getElementsByTagName("ParagraphStyleRange");
      const storyContentArray = Array.from(paragraphs);

      const titleA = "h1a";
      const titleB = "h1b";
      const h2Left = "h2-left";
      const h3Left = "h3-left";
      const pLeft = "p-left";
      const h2Right = "h2-right";
      const h3Right = "h3-right";
      const pRight = "p-right";

      for (const [i, para] of storyContentArray.entries()) {
        //barre el contenido de los archivos
        const style = para.getAttribute("AppliedParagraphStyle");
        const text = para.querySelector("Content")?.textContent?.trim();

        if (!text) continue;

        if (style?.includes(titleA || titleB)) {
          recipeObject.title = text;
        }

        if (style?.includes(h2Left)) {
          switch (text) {
            case "Ingredientes": {
              const ingredientsSections = getSubSectionContent(
                i,
                storyContentArray,
                h2Left,
                h3Left,
                pLeft
              );

              recipeObject.ingredients =
                parseIngredientList(ingredientsSections);
              break;
            }

            case "Cocción":
              getSectionContent(
                i,
                storyContentArray,
                recipeObject,
                "cookingTime"
              );
              break;

            case "Molde":
              getSectionContent(i, storyContentArray, recipeObject, "mold");

              break;

            case "Rinde":
              getSectionContent(i, storyContentArray, recipeObject, "serves");

              break;

            default:
              break;
          }
        }

        if (style?.includes(h2Right)) {
          const instructionsSections = getSubSectionContent(
            i,
            storyContentArray,
            h2Right,
            h3Right,
            pRight
          );

          recipeObject.instructions = instructionsSections;

          getNotes(i, storyContentArray, recipeObject);
          getSource(i, storyContentArray, recipeObject);
        }
      }
    }

    console.log("Recipe que se va a setear:", recipeObject);
    setRecipe(recipeObject);
  };

  return (
    <div>
      <input type="file" accept=".idml" onChange={handleFile} />
      <div>{recipe && <Recipe recipe={recipe} />}</div>
    </div>
  );
};

export default FileUploadIDML;

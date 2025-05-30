import React, { useState } from "react";
import JSZip from "jszip";
// Docs: https://stuk.github.io/jszip/

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
} from "@/utils/file-upload-idml-utils";

import type { RecipeType, FoodAllergyType, SubrecipeIdmlType } from "@/types";

const FileUploadIDML = () => {
  const [recipe, setRecipe] = useState<RecipeType>();

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const recipeObject: RecipeType = {
      title: "",
      subrecipes: [],
    };

    const file = event.target.files?.[0];
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
                    instructions: "",
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
              match.instructions = subrecipe.sectionBody.join("\n");
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

  return (
    <div>
      <input type="file" accept=".idml" onChange={handleFile} />
      {/* <div>{recipe && <Recipe recipe={recipe} />}</div> */}
    </div>
  );
};

export default FileUploadIDML;

import React, { useState } from "react";
import JSZip from "jszip";
// Docs: https://stuk.github.io/jszip/

import Recipe from "@/pages/Recipe";

export type Section = {
  sectionTitle?: string;
  sectionBody: string[];
};

type Source = {
  //puede tener mas de una?
  name?: ""; //name siempre obligatorio?
  url?: ""; //puede tener mas de un link
};

type FoodAllergy = "glutenFree" | "lactoseFree" | "vegan" | "vegetarian";

export type RecipeType = {
  title: string;
  ingredients: Section[];
  cookingTime?: string[];
  mold?: string[];
  serves?: string[];
  preparation: Section[];
  source?: Source;
  foodAllergies?: FoodAllergy[];
};

const FileUploadIDML = () => {
  const [recipe, setRecipe] = useState<RecipeType>();

  function getSectionContent<K extends keyof RecipeType>(
    i: number,
    storyContentArray: Element[],
    recipeObject: RecipeType,
    section: K
  ) {
    const next = storyContentArray[i + 1];
    if (!next) return;

    const sectionContent = Array.from(next.querySelectorAll("Content"))
      .map((el) => el.textContent?.trim())
      .filter((text): text is string => Boolean(text));

    const target = recipeObject[section];

    // Asegura que sea un array antes de hacer push
    if (Array.isArray(target)) {
      (target as string[]).push(...sectionContent);
    }
  }

  const getSubSectionContent = (
    i: number,
    storyContentArray: Element[],
    h2: string,
    h3: string,
    p: string,
    recipeObject: RecipeType,
    sectionKey: keyof RecipeType
  ) => {
    const sections: Section[] = [];
    let currentSection: Section | null = null;
    let genericSection: Section | null = null;
    let hasSeenH3 = false;

    for (let j = i + 1; j < storyContentArray.length; j++) {
      const element = storyContentArray[j];
      const style = element.getAttribute("AppliedParagraphStyle");

      // Cortar si aparece un nuevo h2 (y no es un h3 disfrazado)
      if (style?.includes(h2) && !style.includes(h3) && j > i + 1) {
        break;
      }

      // Detectar subtítulo (h3)
      if (style?.includes(h3)) {
        hasSeenH3 = true;

        // Guardar sección previa
        if (currentSection) {
          sections.push(currentSection);
        }

        const titleContent = Array.from(element.querySelectorAll("Content"))
          .map((el) => el.textContent?.trim())
          .filter((text): text is string => Boolean(text));

        currentSection = {
          sectionTitle: titleContent[0] || "",
          sectionBody: [],
        };

        continue;
      }

      // Detectar párrafos (p)
      if (style?.includes(p)) {
        const bodyContent = Array.from(element.querySelectorAll("Content"))
          .map((el) => el.textContent?.trim())
          .filter((text): text is string => Boolean(text));

        if (hasSeenH3 && currentSection) {
          currentSection.sectionBody.push(...bodyContent);
        } else {
          if (!genericSection) {
            genericSection = {
              sectionTitle: "",
              sectionBody: [],
            };
          }
          genericSection.sectionBody.push(...bodyContent);
        }
      }
    }

    if (hasSeenH3 && currentSection) {
      sections.push(currentSection);
    }

    if (!hasSeenH3 && genericSection) {
      sections.push(genericSection);
    }

    const target = recipeObject[sectionKey];
    if (Array.isArray(target)) {
      (target as Section[]).push(...sections);
    }
  };

  async function getImageNamesFromIDML(zip: JSZip): Promise<string[]> {
    const allergyTags: string[] = [];

    for (const path of Object.keys(zip.files)) {
      // Filtrar solo archivos XML que probablemente contengan <Link>
      if (!path.endsWith(".xml")) continue;

      const content = await zip.files[path].async("text");
      const xml = new DOMParser().parseFromString(content, "application/xml");

      const links = Array.from(xml.getElementsByTagName("Link"));

      for (const link of links) {
        const uri = link.getAttribute("LinkResourceURI");
        if (uri) {
          // Extraer solo el nombre del archivo, si hay una ruta
          const parts = uri.split(/[\\/]/);
          const name = parts[parts.length - 1];

          const foodAllergyImageNames = [
            "gluten",
            "dairy",
            "vegan",
            "vegetarian",
          ];

          const foundAllergies = foodAllergyImageNames.filter((allergy) =>
            name.includes(allergy)
          );

          for (const allergy of foundAllergies) {
            switch (allergy) {
              case "gluten":
                allergyTags.push("glutenFree" as FoodAllergy);
                break;
              case "dairy":
                allergyTags.push("lactoseFree" as FoodAllergy);
                break;
              case "vegan":
                allergyTags.push("vegan" as FoodAllergy);
                break;
              case "vegetarian":
                allergyTags.push("vegetarian" as FoodAllergy);
                break;
            }
          }
        }
      }
    }

    return allergyTags;
  }

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const recipeObject: RecipeType = {
      //revisar si se inician las cosas opcionales
      title: "",
      preparation: [],
      ingredients: [],
      cookingTime: [],
      mold: [],
      serves: [],
      source: {},
      foodAllergies: [],
    };

    const file = event.target.files?.[0];
    if (!file) return;

    const zip = await JSZip.loadAsync(file);
    const allergyTags = await getImageNamesFromIDML(zip);
    recipeObject?.foodAllergies?.push(...(allergyTags as FoodAllergy[]));
    // console.log("Imágenes encontradas:", imageNames);

    const storyFiles = Object.keys(zip.files).filter((path) =>
      path.startsWith("Stories/")
    );

    // console.log("storyFiles", storyFiles);

    for (const path of storyFiles) {
      //barre los archivos xlm
      const content = await zip.files[path].async("text");
      // console.log("content", path, content);

      const parser = new DOMParser();
      const xml = parser.parseFromString(content, "application/xml");
      // console.log("xml", xml);

      const paragraphs = xml.getElementsByTagName("ParagraphStyleRange");
      const storyContentArray = Array.from(paragraphs);
      // console.log("paragraphs", paragraphs);

      const titleA = "h1a";
      const titleB = "h1b";
      const h2Left = "h2-left"; // titulo ingredientes
      const h3Left = "h3-left"; // subtitulo ingredientes
      const pLeft = "p-left"; // cuerpo ingredientes
      const h2Right = "h2-right"; // titulo ingredientes
      const h3Right = "h3-right"; // subtitulo ingredientes
      const pRight = "p-right"; // cuerpo ingredientes
      const source = "fuente"; // fuente y link?

      for (const [i, para] of storyContentArray.entries()) {
        //barre el contenido de los archivos
        const style = para.getAttribute("AppliedParagraphStyle");
        const text = para.querySelector("Content")?.textContent?.trim();

        if (!text) continue;

        if (style?.includes(titleA || titleB)) {
          recipeObject.title = text;
        }

        if (style?.includes(source)) {
          console.log("entra a source");
        }

        if (style?.includes(h2Left)) {
          switch (text) {
            case "Ingredientes":
              getSubSectionContent(
                i,
                storyContentArray,
                h2Left,
                h3Left,
                pLeft,
                recipeObject,
                "ingredients"
              );

              break;
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
          getSubSectionContent(
            i,
            storyContentArray,
            h2Right,
            h3Right,
            pRight,
            recipeObject,
            "preparation"
          );
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

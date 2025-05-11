import React, { useState } from "react";
import JSZip from "jszip";
// Docs: https://stuk.github.io/jszip/

type Section = {
  sectionTitle?: string;
  sectionBody: string[]; //o array de strings dependiendo de si tiene parrafos
};

type FoodAllergy = "glutenFree" | "lactoseFree" | "vegan" | "vegetarian";

type Recipe = {
  title: string;
  preparation: Section[];
  ingredients: Section[];
  cookingTime?: string[];
  mold?: string[];
  serves?: string[];
  source?: string;
  foodAllergies?: FoodAllergy[];
};

const FileUploadIDML = () => {
  const [recipe, setRecipe] = useState<Recipe>();

  function getSectionContent<K extends keyof Recipe>(
    i: number,
    storyContentArray: Element[],
    recipeObject: Recipe,
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
    h3: string,
    p: string,
    recipeObject: Recipe
  ) => {
    const sections: Section[] = [];
    let currentSection: Section | null = null;
    for (let j = i + 1; j < storyContentArray.length; j++) {
      const element = storyContentArray[j];
      const style = element.getAttribute("AppliedParagraphStyle");

      // Nuevo subtítulo (nueva sección)
      if (style?.includes(h3)) {
        // Si ya hay una sección activa, guardarla antes de iniciar otra
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
      }

      // Cuerpo de sección actual
      if (style?.includes(p) && currentSection) {
        const bodyContent = Array.from(element.querySelectorAll("Content"))
          .map((el) => el.textContent?.trim())
          .filter((text): text is string => Boolean(text));

        currentSection.sectionBody.push(...bodyContent);
      }

      // Si aparece un nuevo h2 (como "Preparación", "Cocción", etc), se corta la búsqueda
      if (style?.includes("h2-left") && !style.includes(h3) && j > i + 1) {
        break;
      }
    }

    // Guardar la última sección si existe
    if (currentSection) {
      sections.push(currentSection);
    }

    // Agregar a recipeObject
    recipeObject.ingredients.push(...sections);
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const zip = await JSZip.loadAsync(file);
    const storyFiles = Object.keys(zip.files).filter((path) =>
      path.startsWith("Stories/")
    );

    // console.log("storyFiles", storyFiles);

    const recipeObject: Recipe = {
      title: "",
      preparation: [],
      ingredients: [],
      cookingTime: [],
      mold: [],
      serves: [],
      source: "",
      foodAllergies: [],
    };

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

        if (style?.includes(h2Left)) {
          switch (text) {
            case "Ingredientes":
              console.log("entro ingredientes");

              getSubSectionContent(
                i,
                storyContentArray,
                h3Left,
                pLeft,
                recipeObject
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
      }
    }
    console.log("Recipe que se va a setear:", recipeObject);
    setRecipe(recipeObject);
  };

  return (
    <div>
      <input type="file" accept=".idml" onChange={handleFile} />
      <div>
        {/* {sections.map((section, i) => (
          <div key={i}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default FileUploadIDML;

import type {
  RecipeType,
  BakingInstructionsType,
  MoldType,
  InstructionsSection,
  FoodAllergyType,
  Source,
} from "@/types";
import type { Units } from "@/types/constants/units";
import { UNITS } from "@/types/constants/units";

import JSZip from "jszip";

export function getBakingInstructions(i: number, storyContentArray: Element[]) {
  const next = storyContentArray[i + 1];
  if (!next) return;

  const sectionContent = Array.from(next.querySelectorAll("Content"))
    .map((el) => el.textContent?.trim())
    .filter((text): text is string => Boolean(text));

  const bakingInstructions: BakingInstructionsType = {};

  sectionContent.forEach((item) => {
    if (item.includes("min")) {
      bakingInstructions.time = parseInt(item);
    } else if (item.includes("°C")) {
      bakingInstructions.temperature = parseInt(item);
    }
  });

  return bakingInstructions;
}

export function getMold(i: number, storyContentArray: Element[]) {
  const next = storyContentArray[i + 1];
  if (!next) return;

  const sectionContent = Array.from(next.querySelectorAll("Content"))
    .map((el) => el.textContent?.trim())
    .filter((text): text is string => Boolean(text));

  const mold: MoldType = {};

  sectionContent.forEach((item) => {
    // checks if there is a number inside the string
    if (/\d/.test(item)) {
      mold.size = item;
    } else {
      mold.type = item;
    }
  });

  return mold;
}

export function getServings(i: number, storyContentArray: Element[]) {
  const next = storyContentArray[i + 1];
  if (!next) return;

  const contentEl = next.querySelector("Content");
  if (!contentEl) return;

  const servings = contentEl.textContent?.trim();
  console.log("servings", servings);
  return servings;
}

export const getSubSectionContent = (
  i: number,
  storyContentArray: Element[],
  h2: string,
  h3: string,
  p: string
) => {
  // console.log("story", storyContentArray);
  const sections = [];
  let currentSection: InstructionsSection | null = null;
  let genericSection: InstructionsSection | null = null;
  let hasSeenH3 = false;

  const objetito = [];

  for (let j = i + 1; j < storyContentArray.length; j++) {
    const element = storyContentArray[j];
    const style = element.getAttribute("AppliedParagraphStyle");

    if (style?.includes(h2) && !style.includes(h3) && j > i + 1) {
      break;
    }

    if (style?.includes(h3)) {
      hasSeenH3 = true;

      if (currentSection) {
        sections.push(currentSection);
        console.log("currentSection", currentSection);
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

  objetito.push(...sections);
  // console.log("objetito", objetito);

  return objetito;
};

export function getNotes(i: number, storyContentArray: Element[]) {
  const notes = "notes";

  for (let j = i + 1; j < storyContentArray.length; j++) {
    const element = storyContentArray[j];
    const style = element.getAttribute("AppliedParagraphStyle");
    if (style?.includes(notes)) {
      const notesContent = Array.from(element.querySelectorAll("Content"))
        .map((element) => element.textContent?.trim())
        .filter((text): text is string => Boolean(text))
        .map((text) => text.replace(/^Notas?:\s*/i, "").trim());

      return notesContent;
    }
  }
}

export function getSource(
  i: number,
  storyContentArray: Element[],
  recipeObject: RecipeType
) {
  const source = "source";
  const sourceElement: Source = {
    name: [],
    url: [],
  };

  for (let j = i + 1; j < storyContentArray.length; j++) {
    const element = storyContentArray[j];
    const style = element.getAttribute("AppliedParagraphStyle");
    if (style?.includes(source)) {
      const sourceContent = Array.from(element.querySelectorAll("Content"))
        .map((element) => element.textContent?.trim())
        .filter((text): text is string => Boolean(text));

      sourceContent.forEach((item) => {
        if (item.startsWith("Fuente:")) {
          const namesString = item.replace("Fuente:", "").trim();
          const names = namesString.split("&").map((s) => s.trim());
          sourceElement.name?.push(...names);
        } else if (item.startsWith("http")) {
          sourceElement.url?.push(item);
        }
      });
    }
  }

  recipeObject.source = sourceElement;
}

export async function getImageNamesFromIDML(zip: JSZip): Promise<string[]> {
  const allergyTags: string[] = [];

  for (const path of Object.keys(zip.files)) {
    if (!path.endsWith(".xml")) continue;

    const content = await zip.files[path].async("text");
    const xml = new DOMParser().parseFromString(content, "application/xml");

    const links = Array.from(xml.getElementsByTagName("Link"));

    for (const link of links) {
      const uri = link.getAttribute("LinkResourceURI");
      if (uri) {
        const parts = uri.split(/[\\/]/);
        const name = parts[parts.length - 1];

        // TODO revisar que pasa en recetas saladas
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
              allergyTags.push("glutenFree" as FoodAllergyType);
              break;
            case "dairy":
              allergyTags.push("dairyFree" as FoodAllergyType);
              break;
            case "vegan":
              allergyTags.push("vegan" as FoodAllergyType);
              break;
            case "vegetarian":
              allergyTags.push("vegetarian" as FoodAllergyType);
              break;
          }
        }
      }
    }
  }

  return allergyTags;
}

// TODO Pasar a un utils general? seguro se use en el form
export function normalizeUnit(unit: string, amount?: string): Units | string {
  const lowerCaseUnit = unit.trim().toLowerCase();
  const parsedAmount = amount ? parseInt(amount) : null;
  for (const unit of Object.values(UNITS)) {
    if (unit.synonyms.includes(lowerCaseUnit)) {
      if (parsedAmount && parsedAmount > 1 && unit.abbreviation.plural) {
        return unit.abbreviation.plural;
      }
      return unit.abbreviation;
    }
  }
  //TODO ver si se ataja cuando la unidad no existe
  return unit;
}

export function parseIngredientLine(ingredientLine: string) {
  const [namePart, amountPart] = ingredientLine.split(",").map((s) => s.trim());

  if (!amountPart) {
    return { name: namePart };
  }

  const parts = amountPart.split(" ").filter(Boolean);
  let amount = parts[0];
  let rawUnit = parts.slice(1).join(" ").toLowerCase();

  // Manejar cantidad necesaria
  const normalizedUnit = normalizeUnit(amount);
  if (normalizedUnit === UNITS.AMOUNT_NEEDED.abbreviation) {
    return {
      name: namePart,
      unit: UNITS.AMOUNT_NEEDED.abbreviation,
    };
  }

  // // Convertir fracciones Unicode
  // if (unicodeFractionsMap[amount]) {
  //   amount = unicodeFractionsMap[amount];
  // }

  const unit = normalizeUnit(rawUnit);

  return {
    name: namePart,
    amount,
    unit,
  };
}

export function parseIngredientList(ingredients: InstructionsSection[]) {
  // TODO como atajo las fracciones?
  // TODO como atajo el o
  return ingredients.map((section) => ({
    sectionTitle: section.sectionTitle,
    sectionBody: section.sectionBody.map(parseIngredientLine),
  }));
}

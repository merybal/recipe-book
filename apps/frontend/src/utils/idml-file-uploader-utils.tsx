import JSZip from "jszip"; // Docs: https://stuk.github.io/jszip/

import type {
  RecipeType,
  BakingInstructionsType,
  MoldType,
  SubrecipeIdmlType,
  DietaryRestrictionType,
  DietaryRestrictionRaw,
  Source,
  UnitRaw,
} from "@/types";

import type { UnitAbbreviationsType } from "@/types";
import { DIETARY_RESTRICTIONS, UNITS } from "@/constants";

export function getBakingInstructions(i: number, storyContentArray: Element[]) {
  const next = storyContentArray[i + 1];
  if (!next) return;

  const sectionContent = Array.from(next.querySelectorAll("Content"))
    .map((el) => el.textContent?.trim())
    .filter((text): text is string => Boolean(text));

  const bakingInstructions: BakingInstructionsType = {};

  sectionContent.forEach((item) => {
    if (item.includes("min")) {
      bakingInstructions.time = item.trim();
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
  return servings;
}

export const getSubrecipesContent = (
  i: number,
  storyContentArray: Element[],
  h2: string,
  h3: string,
  p: string
) => {
  const sections = [];
  let currentSection: SubrecipeIdmlType | null = null;
  let genericSection: SubrecipeIdmlType | null = null;
  let hasSeenH3 = false;

  const subrecipes = [];

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

  subrecipes.push(...sections);

  return subrecipes;
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

        // TODO check what happens with savory recipes
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
              allergyTags.push("glutenFree" as DietaryRestrictionType);
              break;
            case "dairy":
              allergyTags.push("dairyFree" as DietaryRestrictionType);
              break;
            case "vegan":
              allergyTags.push("vegan" as DietaryRestrictionType);
              break;
            case "vegetarian":
              allergyTags.push("vegetarian" as DietaryRestrictionType);
              break;
          }
        }
      }
    }
  }

  return allergyTags;
}

// TODO move to a general utils? likely used in the form
export function normalizeUnit(
  unit: string,
  amount?: number
): UnitAbbreviationsType | string {
  const lowerCaseUnit = unit.trim().toLowerCase();

  for (const unit of Object.values(UNITS)) {
    if (unit.synonyms.includes(lowerCaseUnit)) {
      if (amount && amount > 1 && unit.abbreviation.plural) {
        return unit.abbreviation.plural;
      }
      return unit.abbreviation.singular;
    }
  }

  // TODO check if it's handled when unit doesn't exist
  return unit;
}

/** Unicode vulgar fractions -> decimal value */
const UNICODE_FRACTIONS: Record<string, number> = {
  '¼': 1 / 4,
  '½': 1 / 2,
  '¾': 3 / 4,
  '⅓': 1 / 3,
  '⅔': 2 / 3,
  '⅕': 1 / 5,
  '⅖': 2 / 5,
  '⅗': 3 / 5,
  '⅘': 4 / 5,
  '⅙': 1 / 6,
  '⅚': 5 / 6,
  '⅛': 1 / 8,
  '⅜': 3 / 8,
  '⅝': 5 / 8,
  '⅞': 7 / 8,
};

/** Decimal -> Unicode fraction symbol (for display). Uses epsilon for float comparison. */
const DECIMAL_TO_UNICODE: { value: number; symbol: string }[] = [
  { value: 1 / 8, symbol: '⅛' },
  { value: 1 / 6, symbol: '⅙' },
  { value: 1 / 5, symbol: '⅕' },
  { value: 1 / 4, symbol: '¼' },
  { value: 1 / 3, symbol: '⅓' },
  { value: 1 / 2, symbol: '½' },
  { value: 2 / 5, symbol: '⅖' },
  { value: 2 / 3, symbol: '⅔' },
  { value: 3 / 8, symbol: '⅜' },
  { value: 3 / 5, symbol: '⅗' },
  { value: 3 / 4, symbol: '¾' },
  { value: 4 / 5, symbol: '⅘' },
  { value: 5 / 6, symbol: '⅚' },
  { value: 5 / 8, symbol: '⅝' },
  { value: 7 / 8, symbol: '⅞' },
].sort((a, b) => b.value - a.value); // descending to match larger fractions first

const EPSILON = 1e-9;

export function formatAmountForDisplay(amount: number): string {
  const whole = Math.floor(amount);
  const frac = amount - whole;
  if (frac < EPSILON) return String(whole);
  const match = DECIMAL_TO_UNICODE.find(
    (f) => Math.abs(frac - f.value) < EPSILON,
  );
  if (match) {
    return whole > 0 ? `${whole}${match.symbol}` : match.symbol;
  }
  return String(amount);
}

function parseUnicodeFraction(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed in UNICODE_FRACTIONS) return UNICODE_FRACTIONS[trimmed];
  // "1½" -> 1 + 0.5
  const match = trimmed.match(/^(\d+)([¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])$/);
  if (match) {
    return parseInt(match[1], 10) + (UNICODE_FRACTIONS[match[2]] ?? 0);
  }
  return null;
}

export function parseAmount(value: string): number {
  const unicodeVal = parseUnicodeFraction(value);
  if (unicodeVal !== null) return unicodeVal;

  // mixed fraction ("1 1/2")
  if (value.includes(" ")) {
    const [whole, fraction] = value.split(" ");
    return parseInt(whole) + parseAmount(fraction);
  }

  // simple fraction (eg: "1/2")
  if (value.includes("/")) {
    const [numerator, denominator] = value.split("/").map(Number);
    if (!denominator) return Number(value);
    return numerator / denominator;
  }

  // Integer
  return parseFloat(value);
}

export function parseIngredientLine(ingredientLine: string) {
  const [namePart, amountAndUnitPart] = ingredientLine
    .split(",")
    .map((s) => s.trim());

  if (!amountAndUnitPart) {
    return { name: namePart };
  }

  const parts = amountAndUnitPart.split(" ").filter(Boolean);

  let amountRaw: string | undefined;
  let unitRaw: string | undefined;

  // check if there is a combined fraction (eg: "1 1/2")
  if (
    parts.length >= 2 &&
    /^\d+$/.test(parts[0]) && // integer
    /^\d+\/\d+$/.test(parts[1]) // fraction
  ) {
    amountRaw = `${parts[0]} ${parts[1]}`;
    unitRaw = parts.slice(2).join(" ");
  }
  // simple fraction (eg: "1/2")
  else if (/^\d+\/\d+$/.test(parts[0])) {
    amountRaw = parts[0];
    unitRaw = parts.slice(1).join(" ");
  }
  // integer (eg: "100 g")
  else if (/\d/.test(parts[0])) {
    amountRaw = parts[0];
    unitRaw = parts.slice(1).join(" ");
  }
  // Unicode fraction (eg: "½ taza" or "1½ tazas")
  else if (parseUnicodeFraction(parts[0]) !== null) {
    amountRaw = parts[0];
    unitRaw = parts.slice(1).join(" ");
  } else {
    unitRaw = parts.join(" ");
  }

  return {
    name: namePart,
    ...(amountRaw && { amount: parseAmount(amountRaw) }),
    ...(unitRaw && { unit: normalizeUnit(unitRaw) }),
  };
}

export function getUnitId(
  unit: string | undefined | null,
  units: UnitRaw[]
): number | null {
  if (!unit) return null;

  const normalized = normalizeUnit(unit);
  if (!normalized) return null;

  const lower = normalized.toLowerCase();
  const match = units.find(
    (u) =>
      u.abbreviation_singular.toLowerCase() === lower ||
      (u.abbreviation_plural?.toLowerCase() ?? "") === lower ||
      u.synonyms.some((s) => s.toLowerCase() === lower)
  );

  return match?.id ?? null;
}

export function transformRecipeForPost(
  recipe: RecipeType,
  units: UnitRaw[],
  dietaryRestrictions: DietaryRestrictionRaw[]
) {
  const formattedRecipe = {
    title: recipe.title,
    servings: recipe.servings,
    mold_type: recipe.mold?.type || null,
    mold_size: recipe.mold?.size || null,
    cooking_time: recipe.bakingInstructions?.time?.trim() || null,
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

    recipe_dietary_restrictions: {
      create: (recipe.dietaryRestrictions ?? [])
        .map((key) => {
          const backendName = DIETARY_RESTRICTIONS[key];
          return dietaryRestrictions.find((dr) => dr.name === backendName)?.id;
        })
        .filter((id): id is number => !!id)
        .map((id) => ({ dietary_restriction_id: id })),
    },
  };

  console.log(formattedRecipe);

  return formattedRecipe;
}

export async function parseIdmlFile(
  selectedFile: File
): Promise<RecipeType | undefined> {
  if (!selectedFile) return undefined;

  const zip = await JSZip.loadAsync(selectedFile);
  const allergyTags = await getImageNamesFromIDML(zip);

  const recipeObject: RecipeType = {
    title: "",
    subrecipes: [],
  };

  if (allergyTags.length) {
    recipeObject.dietaryRestrictions = [];
    recipeObject.dietaryRestrictions.push(
      ...(allergyTags as DietaryRestrictionType[]),
    );
  }

  const storyFiles = Object.keys(zip.files).filter((path) =>
    path.startsWith("Stories/")
  );

  for (const path of storyFiles) {
    // goes through xml files
    const content = await zip.files[path].async("text");

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
            // match.instructions = subrecipe.sectionBody.join("\n"); // TODO do only in the post
            match.instructions = subrecipe.sectionBody;
          }
        });

        recipeObject.notes = getNotes(i, storyContentArray);
        getSource(i, storyContentArray, recipeObject);
      }
    }
  }
  console.log(recipeObject);
  return recipeObject;
}

export function parseIngredientsText(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .map(parseIngredientLine);
}

/** Inverse of parseIngredientsText: formats ingredients array to text (one per line). */
export function formatIngredientsToText(
  ingredients: { name: string; amount?: number; unit?: string }[],
): string {
  return ingredients
    .map((ing) => {
      const amountPart =
        ing.amount != null
          ? `${formatAmountForDisplay(ing.amount)} ${ing.unit || ""}`.trim()
          : ing.unit
            ? String(ing.unit)
            : "";
      return amountPart ? `${ing.name}, ${amountPart}` : ing.name;
    })
    .join("\n");
}

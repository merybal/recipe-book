import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Instructions from "@/components/Instructions";
import IngredientList from "@/components/IngredientList";
import BottomSheet from "../design-system/src/components/BottomSheet";
import FoodAllergies from "../components/FoodAllergies";
// import Source from "../components/Source";
import Separator from "../design-system/src/components/Separator/Separator";
import Chip from "../design-system/src/components/Chip/Chip";

import { parseFoodAllergiesforFrontend } from "@/utils/food-allergies-utils";

import type {
  RecipeType,
  SubrecipeType,
  SubrecipeRaw,
  IngredientType,
  IngredientRaw,
  RecipeFoodAllergyRaw,
} from "@/types";

import { useIsMobile } from "@/hooks/useIsMobile";
import { normalizeUnit } from "@/utils/idml-file-uploader-utils"; //TODO rename file

import styles from "./Recipe.module.scss";

/**
 * //TODO
 * - revisar que pasa cuando no hay Chips o autores. como se modifica el layout
 * - hay que programar el volver a la pagina anterior?
 * - desktop
 */

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!id) return;

    //TODO pasar a utils o a hook

    function parseIngredient(ingredient: IngredientRaw): IngredientType {
      const parsedUnit =
        ingredient.units?.name &&
        normalizeUnit(
          ingredient.units.name,
          ingredient.amount && ingredient.amount
        );

      //TODO revisar types

      const parsedIngredient: IngredientType = {
        name: ingredient.name,
        ...(ingredient.amount && { amount: ingredient.amount }), //TODO REVISAR
        ...(parsedUnit && { unit: parsedUnit }),
      };

      return parsedIngredient;
    }

    function parseSubrecipe(subrecipe: SubrecipeRaw) {
      const parsedSubrecipe: SubrecipeType = {
        ...(subrecipe.title && { title: subrecipe.title }),

        //"Batir los huevos\nAgregar la harina\nHornear"
        instructions: subrecipe.instructions
          .split("\n")
          .map((i) => i.trim())
          .filter(Boolean), //TODO cambiar para que se parsee separando parrafos con /n
        ingredients: subrecipe.ingredients.map(parseIngredient),
      };

      return parsedSubrecipe;
    }

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/recipes/${id}`);

        const recipeData = response.data;
        console.log("recipeData", recipeData);

        const parsedRecipe: RecipeType = {
          id: id,
          title: recipeData.title,
          ...(recipeData.imageUrl && { imageUrl: recipeData.image_url }),
          subrecipes: recipeData.subrecipes.map(parseSubrecipe),

          ...(recipeData.cooking_time || recipeData.cooking_temperature
            ? {
                bakingInstructions: {
                  ...(recipeData.cooking_time && {
                    time: recipeData.cooking_time,
                  }),
                  ...(recipeData.cooking_temperature && {
                    temperature: recipeData.cooking_temperature,
                  }),
                },
              }
            : {}),

          ...(recipeData.mold_type || recipeData.mold_size
            ? {
                mold: {
                  ...(recipeData.mold_type && { type: recipeData.mold_type }),
                  ...(recipeData.mold_size && { size: recipeData.mold_size }),
                },
              }
            : {}),

          ...(recipeData.servings && { size: recipeData.servings }),

          ...(recipeData.recipe_food_allergies?.length > 0 && {
            foodAllergies: recipeData.recipe_food_allergies
              .map((item: RecipeFoodAllergyRaw) =>
                parseFoodAllergiesforFrontend(item.food_allergy.name)
              )
              .filter(Boolean), // filtra los undefined en caso de valores no reconocidos
          }),
          // notes?: recipeData.[],
          // source?: Source,
        };

        console.log("parsed recipe", parsedRecipe);

        setRecipe(parsedRecipe);
      } catch (err) {
        console.error(err);
        setError("Hubo un error al cargar la receta");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>No se encontró la receta</div>;

  const content = (
    <section className={styles["recipe-container"]}>
      <header>
        <div className={styles["title-container"]}>
          <h1 className={styles.title}>{recipe.title}</h1>
          {recipe.foodAllergies && (
            <FoodAllergies allergies={recipe.foodAllergies} />
          )}
        </div>
        <Separator />
        <div className={styles["recipe-info-container"]}>
          <div className={styles["chip-container"]}>
            {recipe.bakingInstructions && (
              <Chip>
                {recipe.bakingInstructions.time && (
                  <p>{recipe.bakingInstructions.time}</p>
                )}
                {recipe.bakingInstructions.temperature && (
                  <p>{recipe.bakingInstructions.temperature}°C</p>
                )}
              </Chip>
            )}
            {recipe.mold && (
              <Chip>
                {recipe.mold.type && <p>{recipe.mold.type}</p>}
                {recipe.mold.size && <p>{recipe.mold.size}</p>}
              </Chip>
            )}
            {recipe.servings && (
              <Chip>
                <p>{recipe.servings}</p>
              </Chip>
            )}
          </div>
          {/* {source && <Source source={source} />} */}
        </div>
      </header>
      <Separator />
      <IngredientList subrecipes={recipe.subrecipes} />
      <Separator />
      <Instructions isNumbered subrecipes={recipe.subrecipes} />
    </section>
  );

  return (
    <>
      <div className={styles["image-Container"]}>
        <img
          className={styles["recipe-image"]}
          src="https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg"
        />
      </div>
      {isMobile ? <BottomSheet>{content}</BottomSheet> : <div>{content}</div>}
    </>
  );
};

export default Recipe;

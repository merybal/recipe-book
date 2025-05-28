// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios"

import Instructions from "@/components/Instructions";
import IngredientList from "@/components/IngredientList";
import BottomSheet from "../design-system/BottomSheet";
import FoodAllergies from "../components/FoodAllergies";
import Source from "../components/Source";
import Separator from "../design-system/Separator";
import Tag from "../design-system/Tag";

import type { RecipeType } from "@/types/types";

import { useIsMobile } from "@/hooks/useIsMobile";

import styles from "./Recipe.module.scss";

type RecipeProps = {
  recipe: RecipeType;
};

/**
 * //TODO
 * - revisar que pasa cuando no hay tags o autores. como se modifica el layout
 * - hay que programar el volver a la pagina anterior?
 * - desktop
 */

const Recipe = ({ recipe }: RecipeProps) => {
  // const { id } = useParams<{ id: string }>();
  // const isMobile = useIsMobile();

  // const [recipe, setRecipe] = useState<RecipeType | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //   if (!id) return;

  //   const fetchRecipe = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/recipes/${id}`);
  //       setRecipe(response.data);
  //     } catch (err) {
  //       console.error("Error fetching recipe:", err);
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRecipe();
  // }, [id]);

  // if (loading) return <p>Cargando receta...</p>;
  // if (error || !recipe) return <p>Error al cargar la receta.</p>;

  const {
    title,
    ingredients,
    cookingTime,
    mold,
    servings,
    instructions,
    source,
    foodAllergies,
  } = recipe;

  const isMobile = useIsMobile();

  const content = (
    <section className={styles.recipeContainer}>
      <header>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
          {foodAllergies && <FoodAllergies allergies={foodAllergies} />}
        </div>
        <Separator />
        <div className={styles.recipeInfoContainer}>
          <div className={styles.tagContainer}>
            {cookingTime && (
              <Tag>
                {cookingTime.map((line) => {
                  return <p key={line}>{line}</p>;
                })}
              </Tag>
            )}
            {mold && (
              <Tag>
                {mold.map((line) => {
                  return <p key={line}>{line}</p>;
                })}
              </Tag>
            )}
            {servings && (
              <Tag>
                {servings.map((line) => {
                  return <p key={line}>{line}</p>;
                })}
              </Tag>
            )}
          </div>
          {source && <Source source={source} />}
        </div>
      </header>
      <Separator />
      <IngredientList sections={ingredients} />
      <Separator />
      <Instructions isNumbered sections={instructions} />
    </section>
  );

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          className={styles.recipeImage}
          src="https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg"
        />
      </div>
      {isMobile ? <BottomSheet>{content}</BottomSheet> : <div>{content}</div>}
    </>
  );
};

export default Recipe;

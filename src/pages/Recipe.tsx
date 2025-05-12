import Instructions from "@/components/Instructions";
import IngredientList from "@/components/IngredientList";

import type { RecipeType } from "@/types/types";

import recipes from "@/mock/mock-data";

import styles from "./Recipe.module.scss";

type RecipeProps = {
  recipe: RecipeType;
};

const Recipe = ({ recipe }: RecipeProps) => {
  const {
    title,
    ingredients,
    cookingTime,
    mold,
    serves,
    instructions,
    source,
    foodAllergies,
  } = recipe;
  return (
    <div className={styles["recipe-container"]}>
      <h1 className={styles["recipe-title"]}>{title}</h1>
      <img className={styles["main-image"]} src={recipes[0].imgUrl} />
      <IngredientList sections={ingredients} />
      <Instructions title="Preparación" sections={instructions} />
    </div>
  );
};

export default Recipe;

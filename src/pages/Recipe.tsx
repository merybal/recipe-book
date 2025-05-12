import RecipeSection from "@/components/RecipeSection";

import type { RecipeType } from "@/components/FileUploadIDML";

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
    preparation,
    source,
    foodAllergies,
  } = recipe;
  return (
    <div className={styles["recipe-container"]}>
      <h1 className={styles["recipe-title"]}>{title}</h1>
      <img className={styles["main-image"]} src={recipes[0].imgUrl} />
      <RecipeSection title="Ingredientes" sections={ingredients} />
      <RecipeSection title="Preparación" sections={preparation} />
    </div>
  );
};

export default Recipe;

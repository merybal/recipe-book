import Instructions from "@/components/Instructions";
import IngredientList from "@/components/IngredientList";
import Separator from "../design-system/Separator";
import BottomSheet from "../design-system/BottomSheet";

import type { RecipeType } from "@/types/types";

import { useIsMobile } from "@/hooks/useIsMobile";

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

  const isMobile = useIsMobile();

  const content = (
    <div className={styles["recipe-container"]}>
      <h1 className={styles["recipe-title"]}>{title}</h1>

      <IngredientList sections={ingredients} />
      <Separator />
      <Instructions title="Preparación" sections={instructions} />
    </div>
  );

  return (
    <div className={styles["test"]}>
      <div className={styles["image-container"]}>
        <img
          className={styles["main-image"]}
          src="https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg"
        />
      </div>
      {isMobile ? <BottomSheet>{content}</BottomSheet> : <div>{content}</div>}
    </div>
  );
};

export default Recipe;

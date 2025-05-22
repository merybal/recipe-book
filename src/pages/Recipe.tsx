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
            {serves && (
              <Tag>
                {serves.map((line) => {
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

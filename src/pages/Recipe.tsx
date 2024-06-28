import IngredientList from "@/components/IngredientList";
import StepList from "@/components/StepList";

import recipes from "@/mock/mock-data";

import styles from "./Recipe.module.scss";

const Recipe = () => {
  return (
    <div className={styles["recipe-container"]}>
      <h1 className={styles["recipe-title"]}>{recipes[0].title}</h1>
      <img className={styles["main-image"]} src={recipes[0].imgUrl} />
      {recipes[0].source && <p>Fuente: {recipes[0].source?.author}</p>}
      <IngredientList preparations={recipes[0].preparations} />
      <StepList preparations={recipes[0].preparations} />
    </div>
  );
};

export default Recipe;

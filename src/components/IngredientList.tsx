import { PreparationsProps } from "@/types/interfaces";

import styles from "./IngredientList.module.scss";

const IngredientList = ({ preparations }: PreparationsProps) => {
  return (
    <div className={styles["ingredient-list"]}>
      <h2>Ingredientes</h2>
      {preparations.map((preparation) => {
        return (
          <div key={preparation.title}>
            <h3>{preparation.title}</h3>
            <ul>
              {preparation.ingredients.map((item) => {
                return (
                  <li key={item.ingredient} className={styles["ingredient"]}>
                    <p>{item.ingredient}</p>
                    <p>
                      {item.quantity} {item.unit}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default IngredientList;

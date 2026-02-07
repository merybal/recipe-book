import Icon from "@/design-system/components/Icon";

import type { SubrecipeType } from "@/types";

import styles from "./IngredientList.module.scss";

type IngredientListProps = {
  subrecipes: SubrecipeType[];
};

const IngredientList = ({ subrecipes }: IngredientListProps) => {
  console.log("subrecipes", subrecipes);

  return (
    <div>
      <h2 className={styles["ingredients-title"]}>Ingredientes</h2>
      <div className={styles["sections-container"]}>
        {subrecipes.map((subrecipe, i) => {
          return (
            <div key={`seccion-${i}`} className={styles.section}>
              {subrecipe.title && (
                <h3 className={styles["section-title"]}>{subrecipe.title}</h3>
              )}
              <ul className={styles["ingredients-ul"]}>
                {subrecipe.ingredients &&
                  subrecipe.ingredients.map((paragraph, j) => {
                    console.log(typeof paragraph.unit);
                    return (
                      <li
                        key={`ingredient-${j}`}
                        className={styles["ingredient-li"]}
                      >
                        <Icon name="Circle" color="primary" size="md" />
                        <p>{paragraph.name},</p>
                        <div className={styles["ingredient-amount"]}>
                          <p>{paragraph.amount}</p>
                          {paragraph.unit && <p>{paragraph.unit}</p>}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IngredientList;

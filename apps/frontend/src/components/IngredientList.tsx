import Icon from "@/design-system/Icon";

import type { SubrecipeType } from "@/types";

import styles from "./IngredientList.module.scss";

type IngredientListProps = {
  subrecipes: SubrecipeType[];
};

const IngredientList = ({ subrecipes }: IngredientListProps) => {
  console.log("subrecipes", subrecipes);

  return (
    <div>
      <h2 className={styles.ingredientsTitle}>Ingredientes</h2>
      <div className={styles.sectionsContainer}>
        {subrecipes.map((subrecipe, i) => {
          return (
            <div key={`seccion-${i}`} className={styles.section}>
              {subrecipe.title && (
                <h3 className={styles.sectionTitle}>{subrecipe.title}</h3>
              )}
              <ul className={styles["ingredientsUl"]}>
                {subrecipe.ingredients &&
                  subrecipe.ingredients.map((paragraph, j) => {
                    console.log(typeof paragraph.unit);
                    return (
                      <li
                        key={`ingrediente-${j}`}
                        className={styles["ingredientLi"]}
                      >
                        <Icon
                          name="check"
                          color="primary"
                          background="primary-light"
                          size="xs"
                        />
                        <p>{paragraph.name},</p>
                        <div className={styles["ingredientAmount"]}>
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

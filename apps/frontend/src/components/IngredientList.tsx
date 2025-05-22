import type { IngredientsSection } from "@/types/types";
import { ReactComponent as CheckCircle } from "../assets/check-circle.svg";

import styles from "./IngredientList.module.scss";

type IngredientListProps = {
  sections: IngredientsSection[];
};

const IngredientList = ({ sections }: IngredientListProps) => {
  return (
    <div>
      <h2 className={styles.ingredientsTitle}>Ingredientes</h2>
      <div className={styles.sectionsContainer}>
        {sections.map((section, i) => {
          return (
            <div key={`seccion-${i}`} className={styles.section}>
              {section.sectionTitle && (
                <h3 className={styles.sectionTitle}>{section.sectionTitle}</h3>
              )}
              <ul className={styles["ingredientsUl"]}>
                {section.sectionBody &&
                  section.sectionBody.map((paragraph, j) => {
                    return (
                      <li
                        key={`ingrediente-${j}`}
                        className={styles["ingredientLi"]}
                      >
                        <CheckCircle className={styles["checkCircle"]} />
                        <p>{paragraph.name},</p>
                        <div className={styles["ingredientAmount"]}>
                          <p>{paragraph.amount}</p>
                          <p>{paragraph.unit}</p>
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

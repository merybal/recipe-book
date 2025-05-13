import type { IngredientsSection } from "@/types/types";

import styles from "./IngredientList.module.scss";

type IngredientListProps = {
  sections: IngredientsSection[];
};

const IngredientList = ({ sections }: IngredientListProps) => {
  return (
    <div>
      <h2>Ingredientes</h2>
      {sections.map((section, i) => {
        return (
          <div key={`seccion-${i}`}>
            {section.sectionTitle && <h3>{section.sectionTitle}</h3>}
            <ul>
              {section.sectionBody &&
                section.sectionBody.map((paragraph, j) => {
                  return (
                    <li
                      key={`ingrediente-${j}`}
                      className={styles["ingredient-li"]}
                    >
                      <p>{paragraph.name},</p>
                      <div className={styles["ingredient-quantity"]}>
                        <p>{paragraph.quantity}</p>
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
  );
};

export default IngredientList;

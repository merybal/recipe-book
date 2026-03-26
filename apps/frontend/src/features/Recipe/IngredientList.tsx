import Icon from "@/design-system/components/Icon";
import {
  formatAmountForDisplay,
  normalizeUnit,
} from "@/utils/idml-file-uploader-utils";

import type { SubrecipeType } from "@/types";

import styles from "./IngredientList.module.scss";

type IngredientListProps = {
  subrecipes: SubrecipeType[];
};

const IngredientList = ({ subrecipes }: IngredientListProps) => {
  const withIngredients = subrecipes.filter(
    (s) => (s.ingredients?.length ?? 0) > 0,
  );

  if (withIngredients.length === 0) {
    return null;
  }

  const showSubrecipeTitles = withIngredients.length > 1;

  return (
    <div>
      <h2 className={styles["ingredients-title"]}>Ingredientes</h2>
      <div className={styles["sections-container"]}>
        {withIngredients.map((subrecipe, i) => {
          return (
            <div key={`seccion-${i}`} className={styles.section}>
              {showSubrecipeTitles && subrecipe.title && (
                <h3 className={styles["section-title"]}>{subrecipe.title}</h3>
              )}
              <ul className={styles["ingredients-ul"]}>
                {subrecipe.ingredients!.map((paragraph, j) => (
                  <li
                    key={`ingredient-${j}`}
                    className={styles["ingredient-li"]}
                  >
                    <Icon name="Circle" color="primary" size="md" />
                    <p>{paragraph.name},</p>
                    <div className={styles["ingredient-amount"]}>
                      {paragraph.amount != null && (
                        <p>{formatAmountForDisplay(paragraph.amount)}</p>
                      )}
                      {paragraph.unit && (
                        <p>
                          {paragraph.amount != null
                            ? normalizeUnit(
                                paragraph.unit,
                                paragraph.amount,
                              )
                            : paragraph.unit}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IngredientList;

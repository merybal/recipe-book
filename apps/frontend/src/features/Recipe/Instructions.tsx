import type { SubrecipeType } from "@/types";

import styles from "./Instructions.module.scss";

type InstructionsProps = {
  isNumbered?: boolean;
  introduction?: string;
  subrecipes: SubrecipeType[];
};

const Instructions = ({
  isNumbered,
  introduction,
  subrecipes,
}: InstructionsProps) => {
  const subrecipesWithInstructions = subrecipes.filter(
    (s) => s.instructions && s.instructions.length > 0,
  );
  const hasPrepContent =
    !!introduction?.trim() || subrecipesWithInstructions.length > 0;

  if (!hasPrepContent) {
    return null;
  }

  return (
    <div className={styles.instructions}>
      <h2>Preparación</h2>
      {introduction?.trim() && (
        <p className={styles.introduction}>{introduction.trim()}</p>
      )}
      {subrecipesWithInstructions.map((subrecipe, i) => {
        return (
          <div key={`seccion-${i}`} className={styles.subrecipe}>
            {subrecipe.title && <h3>{subrecipe.title}</h3>}
            <ul className={styles["instructions-ul"]}>
              {subrecipe.instructions.map((paragraph, j) => {
                return (
                  <li
                    key={`ingrediente-${j}`}
                    className={styles["instructions-li"]}
                  >
                    {isNumbered && (
                      <div className={styles["step-number"]}>
                        <p>{j + 1}</p>
                      </div>
                    )}
                    <p className={styles.paragraph}>{paragraph}</p>
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

export default Instructions;

import type { SubrecipeType } from "@/types";

import styles from "./Instructions.module.scss";

type InstructionsProps = {
  isNumbered?: boolean;
  subrecipes: SubrecipeType[];
};

const Instructions = ({ isNumbered, subrecipes }: InstructionsProps) => {
  return (
    <div className={styles.instructions}>
      <h2>Preparación</h2>
      {subrecipes.map((subrecipes, i) => {
        return (
          <div key={`seccion-${i}`} className={styles.subrecipe}>
            {subrecipes.title && <h3>{subrecipes.title}</h3>}
            <ul className={styles.instructionsUl}>
              {subrecipes.instructions &&
                subrecipes.instructions.map((paragraph, j) => {
                  return (
                    <li
                      key={`ingrediente-${j}`}
                      className={styles.instructionsLi}
                    >
                      {isNumbered && (
                        <div className={styles.stepNumber}>
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

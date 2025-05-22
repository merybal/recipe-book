import type { InstructionsSection } from "@/types/types";

import styles from "./Instructions.module.scss";

type InstructionsProps = {
  isNumbered?: boolean;
  sections: InstructionsSection[];
};

const Instructions = ({ isNumbered, sections }: InstructionsProps) => {
  return (
    <div className={styles.instructions}>
      <h2>Preparación</h2>
      {sections.map((section, i) => {
        return (
          <div key={`seccion-${i}`} className={styles.section}>
            {section.sectionTitle && <h3>{section.sectionTitle}</h3>}
            <ul className={styles.instructionsUl}>
              {section.sectionBody &&
                section.sectionBody.map((paragraph, j) => {
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

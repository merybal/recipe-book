import type { Section } from "./FileUploadIDML";

import styles from "./RecipeSection.module.scss";

type RecipeSectionProps = {
  title: string;
  sections: Section[];
};

const RecipeSection = ({ title, sections }: RecipeSectionProps) => {
  const sectionClassName =
    title === "Ingredientes" ? "ingredient" : "preparation";

  return (
    <div className={styles["recipe-section"]}>
      <h2>{title}</h2>
      {sections.map((section, i) => {
        return (
          <div key={`seccion-${i}`} className={styles["section-subtitle"]}>
            {section.sectionTitle && <h3>{section.sectionTitle}</h3>}
            <ul className={styles[`${sectionClassName}-list`]}>
              {section.sectionBody &&
                section.sectionBody.map((paragraph, j) => {
                  return (
                    <li key={`ingrediente-${j}`}>
                      <p>{paragraph}</p>
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

export default RecipeSection;

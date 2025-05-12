import type { InstructionsSection } from "@/types/types";

import styles from "./Instructions.module.scss";

type InstructionsProps = {
  title: string;
  sections: InstructionsSection[];
};

const Instructions = ({ title, sections }: InstructionsProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {sections.map((section, i) => {
        return (
          <div key={`seccion-${i}`}>
            {section.sectionTitle && <h3>{section.sectionTitle}</h3>}
            <ul>
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

export default Instructions;

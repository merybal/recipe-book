//TODO revisar nombre del componente, Process? StepsBody? Instructions
import { PreparationsProps } from "@/types/interfaces";

import styles from "./StepList.module.scss";

const StepList = ({ preparations }: PreparationsProps) => {
  return (
    <div className={styles["step-list"]}>
      <h2 className="">Procedimiento</h2>
      {preparations.map((preparation) => {
        const replaceWithBr = () => {
          return preparation.steps.replace(/\n/g, "<br />");
        };
        return (
          <div key={preparation.title}>
            <h3>{preparation.title}</h3>
            {/* <p className={styles.steps}>{preparation.steps}</p> */}
            <p
              className={styles.steps}
              dangerouslySetInnerHTML={{ __html: replaceWithBr() }}
            />
          </div>
        );
      })}
      {/* TODO como renderizo el texto separado por parrafos desde un solo string */}
    </div>
  );
};

export default StepList;

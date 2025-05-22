import clsx from "clsx";
import { ReactComponent as ExternalLink } from "../assets/external-link.svg";
import { ReactComponent as ChefHat } from "../assets/chef-hat.svg";

import styles from "./Source.module.scss";
import type { Source } from "@/types/types";

export type SourceProps = {
  source: Source;
};

const Source = ({ source }: SourceProps) => {
  return (
    <div className={clsx(styles.sourceContainer)}>
      {source?.name?.map((name, i) => {
        return (
          <div className={styles.source} key={i}>
            <div className={styles.chefHatContainer}>
              <ChefHat className={styles.chefHat} />
            </div>
            <p>{name}</p>
            {source?.url && source?.url[i] && (
              <a
                href={source?.url[i]}
                target="_blank"
                className={styles.externalLink}
              >
                <ExternalLink className={styles.externalLinkIcon} />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Source;

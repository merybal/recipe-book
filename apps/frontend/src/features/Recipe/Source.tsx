import clsx from "clsx";

import Icon from "@/design-system/components/Icon/Icon";

import styles from "./Source.module.scss";
import type { Source } from "@/types";

export type SourceProps = {
  source: Source;
};

const Source = ({ source }: SourceProps) => {
  return (
    <div className={clsx(styles["source-container"])}>
      {source?.name?.map((name, i) => {
        return (
          <div className={styles.source} key={i}>
            <div className={styles["name-container"]}>
              <Icon
                name="ChefHat"
                color="primary"
                background="primary-light"
                size="sm"
              />
              <p>{name}</p>
            </div>
            {source?.url && source?.url[i] && (
              <a
                className={styles["external-link"]}
                href={source?.url[i]}
                target="_blank"
              >
                <Icon name="ExternalLink" color="primary" size="sm" />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Source;

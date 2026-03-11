import clsx from "clsx";

import styles from "./Tile.module.scss";

import type { Source as SourceProps } from "@/types";
import type { DietaryRestrictionType } from "@/types";

import DietaryRestrictions from "@/features/Recipe/DietaryRestrictions";

type TileProps = {
  restrictions?: DietaryRestrictionType[];
  className?: string;
  imageUrl: string;
  source?: SourceProps;
  title: string;
  variant?: "square" | "rectangle";
};

const Tile = ({
  restrictions,
  className,
  imageUrl,
  source,
  title,
  variant = "rectangle",
}: TileProps) => {
  return (
    <div
      className={clsx(
        styles.tile,
        { [styles[`${variant}`]]: variant },
        className,
      )}
    >
      <div className={clsx({ [styles[`${variant}-image`]]: variant })}>
        <img className={styles["recipe-image"]} src={imageUrl} />
      </div>
      <div className={styles["text-container"]}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          {source && source.name?.length && (
            <p className={styles.subtitle}>{source.name.join(" & ")}</p>
          )}
        </div>
        {restrictions && restrictions.length > 0 && (
          <DietaryRestrictions
            className={styles.restrictions}
            restrictions={restrictions}
          />
        )}
      </div>
    </div>
  );
};

export default Tile;

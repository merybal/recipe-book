import clsx from "clsx";

import styles from "./Tile.module.scss";

import type { Source as SourceProps } from "@/types";
import type { FoodAllergyType } from "@/types";

import FoodAllergies from "@/features/Recipe/FoodAllergies";

// TODO define if it should be agnostic with children for text or props title and subtitle
// TODO will food allergies be added?

type TileProps = {
  allergies?: FoodAllergyType[];
  className?: string;
  imageUrl: string;
  source?: SourceProps;
  title: string;
  variant?: "square" | "rectangle";
};

const Tile = ({
  allergies,
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
        {allergies && allergies.length > 0 && (
          <FoodAllergies className={styles.allergies} allergies={allergies} />
        )}
      </div>
    </div>
  );
};

export default Tile;

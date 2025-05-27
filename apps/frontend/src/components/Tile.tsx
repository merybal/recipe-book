import clsx from "clsx";

import styles from "./Tile.module.scss";

import type { Source as SourceProps } from "@/types/types";
import type { FoodAllergy } from "@/types/types";

import FoodAllergies from "./FoodAllergies";

// TODO definir si se hace agnostico con un children para el texto o props title y substitle
// TODO se van a agregar food allergies?

type TileProps = {
  allergies?: FoodAllergy[];
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
        className
      )}
    >
      <div className={clsx({ [styles[`${variant}-image`]]: variant })}>
        <img className={styles.recipeImage} src={imageUrl} />
      </div>
      <div className={styles.textContainer}>
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

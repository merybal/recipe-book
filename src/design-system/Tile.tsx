import Source from "../components/Source";
import clsx from "clsx";

import styles from "./Tile.module.scss";
import type { Source as SourceProps } from "@/types/types";
import type { FoodAllergy } from "@/types/types";
type TileProps = {
  className?: string;
  allergies?: FoodAllergy[];
  imageUrl: string;
  source?: SourceProps;
  title: string;
  variant?: "square" | "rectangle";
};

const Tile = ({
  className,
  imageUrl,
  source,
  title,
  variant = "rectangle",
}: TileProps) => {
  return (
    <div>
      <div
        className={clsx(
          styles.tile,
          { [styles[`${variant}`]]: variant },
          className
        )}
      >
        <img className={styles.recipeImage} src={imageUrl} />
      </div>
      <h3>{title}</h3>
      {source && <Source source={source} />}
    </div>
  );
};

export default Tile;

import clsx from "clsx";

import Box from "@/design-system/components/Box";
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
    <Box
      className={clsx(styles.tile, { [styles[`${variant}`]]: variant }, className)}
      direction="column"
    >
      <Box className={clsx({ [styles[`${variant}-image`]]: variant })}>
        <img className={styles["recipe-image"]} src={imageUrl} alt="" />
      </Box>
      <Box className={styles["text-container"]}>
        <Box direction="column">
          <h3 className={styles.title}>{title}</h3>
          {source && source.name?.length && (
            <p className={styles.subtitle}>{source.name.join(" & ")}</p>
          )}
        </Box>
        {restrictions && restrictions.length > 0 && (
          <DietaryRestrictions
            className={styles.restrictions}
            iconsOnly
            restrictions={restrictions}
          />
        )}
      </Box>
    </Box>
  );
};

export default Tile;

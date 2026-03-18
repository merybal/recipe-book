import { Fragment } from "react";
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
  const sourceNames =
    source?.name?.filter((n) => n?.trim()) ?? [];

  return (
    <Box
      className={clsx(
        styles.tile,
        { [styles[`${variant}`]]: variant },
        className,
      )}
      direction="column"
      flex
    >
      <Box
        borderRadius="lg"
        className={clsx({ [styles[`${variant}-image`]]: variant })}
      >
        <img className={styles["recipe-image"]} src={imageUrl} alt="" />
      </Box>
      <Box className={styles["text-container"]} flex>
        <Box direction="column" flex>
          <h3 className={styles.title}>{title}</h3>
          {sourceNames.length > 0 ? (
            <div className={styles.subtitle}>
              {sourceNames.map((name, i) => (
                <Fragment key={i}>
                  <span>{name}</span>
                  {i < sourceNames.length - 1 && <span>•</span>}
                </Fragment>
              ))}
            </div>
          ) : null}
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

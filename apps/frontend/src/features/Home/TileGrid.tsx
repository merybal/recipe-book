import clsx from "clsx";
import Tile from "@/design-system/components/Tile/Tile";
import ButtonUnstyled from "@/design-system/components/ButtonUnstyled";

import { useNavigate } from "react-router-dom";

import { useIsMobile } from "@/hooks/useIsMobile";
import type { DietaryRestrictionType } from "@/types";

import DefaultRecipeImage from "@/assets/savory-recipe-default.jpg";

import styles from "./TileGrid.module.scss";

export type PreviewData = {
  id: number;
  title: string;
  imageUrl?: string;
  source?: {
    name: string[];
    url: string[];
  };
  dietaryRestrictions?: DietaryRestrictionType[];
};

type TileGridProps = {
  className?: string;
  grid?: "single" | "double";
  /** Max recipes per row on desktop. Ignored on mobile. */
  maxDesktopColumns?: number;
  previewData?: PreviewData[];
};

const TileGrid = ({
  className,
  grid = "single",
  maxDesktopColumns = 4,
  previewData,
}: TileGridProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleTileClick = (id: number) => {
    navigate(`/recipes/${id}`);
  };

  const isDesktopGrid = !isMobile && grid === "single";

  return (
    <div
      className={clsx(
        styles["tile-grid"],
        { [styles[`${grid}`]]: grid },
        { [styles["desktop-grid"]]: isDesktopGrid },
        className,
      )}
      style={
        isDesktopGrid
          ? { gridTemplateColumns: `repeat(${maxDesktopColumns}, 1fr)` }
          : undefined
      }
    >
      {previewData?.map((recipe) => (
        <ButtonUnstyled
          key={recipe.id}
          onClick={() => handleTileClick(recipe.id)}
        >
          <Tile
            restrictions={recipe.dietaryRestrictions}
            className={styles.tile}
            imageUrl={recipe.imageUrl || DefaultRecipeImage}
            title={recipe.title}
            variant={grid === "single" ? "rectangle" : "square"}
            source={recipe.source}
          />
        </ButtonUnstyled>
      ))}
    </div>
  );
};

export default TileGrid;

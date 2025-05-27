import clsx from "clsx";
import Tile from "./Tile";
import ButtonUnstyled from "@/design-system/ButtonUnstyled";

import { useNavigate } from "react-router-dom";

import type { FoodAllergy } from "@/types/types";

import DefaultRecipeImage from "../assets/savory-recipe-default.jpg";

import styles from "./TileGrid.module.scss";

const recipeArray = [
  {
    id: 1,
    title: "Crumble de manzana",
    imageUrl:
      "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg",
    source: {
      name: ["Paulina Cocina", "Laura Bolomo"],
      url: [
        "https://www.paulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
        "https://www.noespaulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
      ],
    },
  },
  {
    id: 2,
    title: "Crumble de manzana",
    imageUrl:
      "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg",
    source: {
      name: ["Paulina Cocina", "Laura Bolomo"],
      url: [
        "https://www.paulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
        "https://www.noespaulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
      ],
    },
  },
  {
    id: 3,
    title: "Crumble de manzana",
    imageUrl:
      "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg",
    source: {
      name: ["Paulina Cocina", "Laura Bolomo"],
      url: [
        "https://www.paulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
        "https://www.noespaulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
      ],
    },
  },
  {
    id: 4,
    title: "Crumble de manzana",
    imageUrl:
      "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg",
    source: {
      name: ["Paulina Cocina", "Laura Bolomo"],
      url: [
        "https://www.paulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
        "https://www.noespaulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
      ],
    },
  },
  {
    id: 5,
    title: "Crumble de manzana",
    imageUrl:
      "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg",
    source: {
      name: ["Paulina Cocina", "Laura Bolomo"],
      url: [
        "https://www.paulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
        "https://www.noespaulinacocina.net/bizcochuelo-sin-azucar-recetas-diabeticos/10067",
      ],
    },
  },
  {
    id: 6,
    title: "Crumble de manzana",
    imageUrl:
      "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg",
  },
  {
    id: 7,
    title: "Crumble de manzana",
    imageUrl:
      "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg",
  },
  {
    id: 8,
    title: "Crumble de manzana",
    imageUrl:
      "https://terrunioalmacennatural.com/wp-content/uploads/2022/07/crumble-1.jpg",
  },
];

export type PreviewData = {
  id: number;
  title: string;
  imageUrl?: string;
  source?: {
    name: string[];
    url: string[];
  };
  foodAllergies?: FoodAllergy[];
};

type TileGridProps = {
  className?: string;
  grid?: "single" | "double";
  previewData?: PreviewData[];
};

const TileGrid = ({
  className,
  grid = "single",
  previewData,
}: TileGridProps) => {
  const navigate = useNavigate();

  const handleTileClick = (id: number) => {
    navigate(`/recipes/${id}`);
  };
  return (
    <div
      className={clsx(
        styles.tileGrid,
        { [styles[`${grid}`]]: grid },
        className
      )}
    >
      {previewData?.map((recipe) => (
        <ButtonUnstyled
          key={recipe.id}
          onClick={() => handleTileClick(recipe.id)}
        >
          <Tile
            allergies={recipe.foodAllergies}
            className={styles.tile}
            imageUrl={recipe.imageUrl || DefaultRecipeImage}
            title={recipe.title}
            variant={grid === "single" ? "rectangle" : "square"}
            // {...(recipe.source && { source: recipe.source })}
            source={recipeArray[0].source}
          />
        </ButtonUnstyled>
      ))}
    </div>
  );
};

export default TileGrid;

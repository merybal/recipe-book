import clsx from "clsx";
import Tile from "../design-system/Tile";

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

type TileGridProps = {
  className?: string;
  grid?: "single" | "double";
};

const TileGrid = ({ className, grid = "single" }: TileGridProps) => {
  return (
    <div
      className={clsx(
        styles.tileGrid,
        { [styles[`${grid}`]]: grid },
        className
      )}
    >
      {recipeArray.map((recipe) => (
        <div key={recipe.id}>
          <Tile
            className={styles.tile}
            imageUrl={recipe.imageUrl}
            title={recipe.title}
            variant={grid === "single" ? "rectangle" : "square"}
            {...(recipe.source && { source: recipe.source })}
          />
        </div>
      ))}
    </div>
  );
};

export default TileGrid;

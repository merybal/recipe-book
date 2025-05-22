// TODO elegir nuevos iconos que peguen mejor
import { ReactComponent as DairyFreeIcon } from "../assets/dairy-free.svg";
import { ReactComponent as GlutenFreeIcon } from "../assets/gluten-free.svg";
import { ReactComponent as VeganIcon } from "../assets/vegan.svg";
import { ReactComponent as VegatarianIcon } from "../assets/vegetarian.svg";

import type { FoodAllergy } from "@/types/types";
import styles from "./FoodAllergies.module.scss";

export type FoodAllergiesProps = {
  allergies?: FoodAllergy[];
};

const iconMap: Record<string, JSX.Element> = {
  dairyFree: <DairyFreeIcon className={styles.allergyIcon} />,
  glutenFree: <GlutenFreeIcon className={styles.allergyIcon} />,
  vegan: <VeganIcon className={styles.allergyIcon} />,
  vegetarian: <VegatarianIcon className={styles.allergyIcon} />,
};

const FoodAllergies = ({ allergies }: FoodAllergiesProps) => {
  return (
    <div className={styles.foodAllergiesContainer}>
      {allergies &&
        allergies.map((allergy) => (
          <div key={allergy} className={styles.iconContainer}>
            {iconMap[allergy]}
          </div>
        ))}
    </div>
  );
};

export default FoodAllergies;

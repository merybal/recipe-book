// TODO Hacer un componente que componga el ingrediente y otro que cree la lista?
import { Units } from "@/types/constants/units";

interface Ingredient {
  ingredient: string;
  quantity: string; // can be c/n
  unit?: Units; // not required because of c/n
}

interface IngredientListProps {
  ingredientList: Ingredient[];
}

const IngredientList = ({ ingredientList }: IngredientListProps) => {
  return (
    <div>
      <h2 className="">Ingredientes</h2>
      <ul>
        {ingredientList.map((item) => {
          return (
            <li key={item.ingredient}>
              {/* TODO pasar concatenado en un solo P */}
              <p>
                {item.ingredient} {item.quantity} {item.unit}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientList;

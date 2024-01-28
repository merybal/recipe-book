// TODO Hacer un componente que componga el ingrediente y otro que cree la lista?
import { Units } from "../types/constants/units";

interface Ingredient {
  ingredient: string;
  quantity: string; // can be c/n
  unit?: Units; // not required because of c/n
}

interface IngredientsProps {
  ingredientList: Ingredient[];
}

const Ingredients = ({ ingredientList }: IngredientsProps) => {
  return (
    <div>
      <h2>Ingredientes</h2>
      <ul>
        {ingredientList.map((item) => {
          return (
            <li>
              <p>{item.ingredient}</p>
              <p>{item.quantity}</p>
              <p>{item.unit}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ingredients;

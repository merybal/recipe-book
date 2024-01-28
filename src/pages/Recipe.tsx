import Ingredients from "../components/Ingredients";
import recipes from "../mock/mock-data";

const Recipe = () => {
  return (
    <div>
      <h2>Titulo receta</h2>
      <Ingredients ingredientList={recipes[0].preparations[0].ingredients} />
    </div>
  );
};

export default Recipe;

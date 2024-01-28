import IngredientList from "../components/IngredientList";
import StepList from "../components/StepList";

import recipes from "../mock/mock-data";

const Recipe = () => {
  return (
    <div>
      <h2>{recipes[0].title}</h2>
      <IngredientList ingredientList={recipes[0].preparations[0].ingredients} />
      <StepList steps={recipes[0].preparations[0].steps} />
      {recipes[0].source && <p>Fuente: {recipes[0].source?.author}</p>}
    </div>
  );
};

export default Recipe;

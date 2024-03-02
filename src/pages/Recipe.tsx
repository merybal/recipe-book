import IngredientList from "../components/IngredientList";
import StepList from "../components/StepList";

import recipes from "../mock/mock-data";

const Recipe = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold">{recipes[0].title}</h2>
      {recipes[0].preparations.map((preparation) => {
        return (
          <div>
            {preparation.title && (
              <h3 className="font-bold">{preparation.title}</h3>
            )}
            <IngredientList ingredientList={preparation.ingredients} />
            <StepList steps={preparation.steps} />
          </div>
        );
      })}
      {recipes[0].source && <p>Fuente: {recipes[0].source?.author}</p>}
    </div>
  );
};

export default Recipe;

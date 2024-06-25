import IngredientList from "@/components/IngredientList";
import StepList from "@/components/StepList";

import recipes from "@/mock/mock-data";

const Recipe = () => {
  return (
    <div className="recipe-container">
      <h1 className="recipe-title">{recipes[0].title}</h1>
      <img className="recipe-main-image" src={recipes[0].imgUrl} />
      {recipes[0].preparations.map((preparation) => {
        return (
          <div key={preparation.title}>
            {preparation.title && <h3 className="">{preparation.title}</h3>}
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

import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ThemeProvider from "./design-system/ThemeProvider";
import Recipe from "./features/Recipe/RecipeView";
import Home from "./features/Home/HomeView";
import CreateRecipe from "./features/RecipeCreator/CreateRecipeView";
import ComponentShowcase from "./features/ComponentShowcase/ComponentShowcaseView"; //TODO remover cuando se agregue storybook

import styles from "./App.module.scss";

function App() {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<ComponentShowcase />} />
            <Route path="/recipes/:id" element={<Recipe />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
          </Routes>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;

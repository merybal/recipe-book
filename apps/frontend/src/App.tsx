import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ThemeProvider from "./design-system/ThemeProvider";
import RecipeView from "./features/Recipe/RecipeView";
import HomeView from "./features/Home/HomeView";
import CreateRecipeView from "./features/RecipeCreator/CreateRecipeView";
import ComponentShowcaseView from "./features/ComponentShowcase/ComponentShowcaseView"; // TODO remove when storybook is added

import styles from "./App.module.scss";

function App() {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/components" element={<ComponentShowcaseView />} />
            <Route path="/recipes/:id" element={<RecipeView />} />
            <Route path="/create-recipe" element={<CreateRecipeView />} />
          </Routes>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;

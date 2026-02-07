import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ThemeProvider from "./design-system/ThemeProvider";
import Recipe from "./pages/Recipe";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import ComponentShowcase from "./pages/ComponentShowcase"; //TODO remover cuando se agregue storybook

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

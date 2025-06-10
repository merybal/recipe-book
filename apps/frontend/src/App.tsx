// import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import ThemeProvider from "./design-system/ThemeProvider";
import Recipe from "./pages/Recipe";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";

import styles from "./App.module.scss";

function App() {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

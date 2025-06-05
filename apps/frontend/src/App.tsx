// import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Recipe from "./pages/Recipe";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
      </Routes>
    </div>
  );
}

export default App;

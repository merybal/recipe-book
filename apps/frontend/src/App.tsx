// import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Recipe from "./pages/Recipe";
import Home from "./pages/Home";

//TODO hacer un componente layout?

import styles from "./App.module.scss";
import { recipe } from "./mock/mock-data";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<Recipe recipe={recipe} />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

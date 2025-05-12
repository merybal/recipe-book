import React, { useState } from "react";

import styles from "./RecipeForm.module.scss";

const RecipeForm = () => {
  const [title, setTitle] = useState<string>("");
  const [sectionTitles, setSectionTitles] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [hasSections, setHasSections] = useState<boolean>(false);
  const [titleSection, setTitleSection] = useState<string>("");

  const formatTextArea = (raw: string) => {
    let formatted = raw;
    // console.log("raw", raw);
    console.log("raw", JSON.stringify(raw));
    formatted = formatted.replace(/\n{2,}/g, "</p><p>");
    // Aplicar negrita y cursiva
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/\*(.+?)\*/g, "<em>$1</em>");
    console.log("formatted", formatted);
    return `<p>${formatted}</p>`;
  };

  const handleStepsOnChange = (e) => {
    setSteps(e.target.value);
    console.log("value", e.target.value);
    console.log("type", typeof e.target.value);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Recipe form</h1>
      <form className={styles.recipeForm}>
        <label>Titulo</label>
        <input
          className={styles.inputText}
          name="title"
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          Receta con secciones
          <input
            type="checkbox"
            name="add-sections"
            checked={hasSections}
            onChange={(e) => setHasSections(e.target.checked)}
          />
        </label>
        {hasSections ? (
          <>
            <label>Titulo sección</label>
            <input
              className={styles.inputText}
              name="title-section"
              type="text"
              value={titleSection}
              onChange={(e) => setTitleSection(e.target.value)}
            />
            <label>Ingredientes sección</label>
            <textarea
              className={styles.textArea}
              name="steps"
              required
              value={steps}
              onChange={handleStepsOnChange}
            />
          </>
        ) : (
          <>
            <label>Receta</label>
            <textarea
              className={styles.textArea}
              name="steps"
              required
              value={steps}
              onChange={handleStepsOnChange}
            />
          </>
        )}
      </form>
      <h2>Form content</h2>
      <p>Title: {title}</p>
      {/* <p>Steps: {steps}</p> */}

      <div
        id="result"
        dangerouslySetInnerHTML={{ __html: formatTextArea(steps) }}
      />
    </div>
  );
};

export default RecipeForm;

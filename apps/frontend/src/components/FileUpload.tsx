import React, { useState } from "react";
//https://mozilla.github.io/pdf.js/getting_started/
//https://lirantal.com/blog/how-to-read-and-parse-pdfs-pdfjs-create-pdfs-pdf-lib-nodejs
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import styles from "./FileUpload.module.scss";

const FileUpload = () => {
  const [pdfText, setPdfText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [cookingTime, setCookingTime] = useState<string>("");
  const [mold, setMold] = useState<string>("");
  const [portions, setPortions] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await getDocument({ data: typedArray }).promise;

      // let title = [];
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        console.log("content", content);

        const pageText = content.items.map((item: any) => item.str).join(" ");
        fullText += pageText + "\n";
      }
      // console.log("title", title);

      setPdfText(fullText); // 👉 Guardamos el texto en el estado
      console.log("fullText", fullText);

      extraerSeccionesConDuplicados(fullText);

      // console.log("Texto extraído del PDF:", fullText);
      // formatRecipe();
    };

    reader.readAsArrayBuffer(file);
  };

  const divideText = (texto: string) => {
    const limpio = texto.replace(/\s+/g, " ").trim();
    const lower = limpio.toLowerCase();

    const indexPreparation = lower.indexOf("preparación");
    const indexSource = lower.indexOf("fuente:");
    const indexIngredients = lower.indexOf("ingredientes");
    const indexCookingTime = lower.indexOf("cocción");
    const indexMold = lower.indexOf("molde");
    const indexServes = lower.indexOf("rinde");

    const secciones = {
      title: undefined as string | undefined,
      preparation: undefined as string | undefined,
      source: undefined as string | undefined,
      ingredients: undefined as string | undefined,
      cookingTime: undefined as string | undefined,
      mold: undefined as string | undefined,
      serves: undefined as string | undefined,
    };

    // Helper para cortar texto entre dos índices
    const extract = (start: number, end: number | null) =>
      limpio.slice(start, end ?? undefined).trim();

    // Determinar los cortes en orden
    const puntos = [
      { key: "preparation", index: indexPreparation, label: "preparación" },
      { key: "source", index: indexSource, label: "fuente:" },
      { key: "ingredients", index: indexIngredients, label: "ingredientes" },
      { key: "cookingTime", index: indexCookingTime, label: "cocción" },
      { key: "mold", index: indexMold, label: "molde" },
      { key: "serves", index: indexServes, label: "rinde" },
    ]
      .filter((p) => p.index !== -1)
      .sort((a, b) => a.index - b.index);

    // Si hay alguna sección, lo que hay antes es el title
    if (puntos.length > 0) {
      secciones.title = extract(0, puntos[0].index);
    } else {
      secciones.title = limpio;
    }

    // Extraer secciones entre cada punto
    for (let i = 0; i < puntos.length; i++) {
      const { key, index, label } = puntos[i];
      const start = index + label.length;
      const end = i + 1 < puntos.length ? puntos[i + 1].index : null;
      secciones[key as keyof typeof secciones] = extract(start, end)
        .replace(new RegExp(label, "ig"), "")
        .trim();
    }

    // return secciones;
    console.log(secciones);

    setTitle(secciones.title);
    if (secciones.ingredients) setIngredients(secciones.ingredients);
    if (secciones.preparation) setSteps(secciones.preparation);
    if (secciones.source) setSource(secciones.source);
    if (secciones.cookingTime) setCookingTime(secciones.cookingTime);
    if (secciones.mold) setMold(secciones.mold);
    if (secciones.serves) setPortions(secciones.serves);
  };

  function extraerSeccionesConDuplicados(texto: string) {
    const limpio = texto.replace(/\s+/g, " ").trim();
    const lower = limpio.toLowerCase();

    const labels = [
      { key: "preparation", label: "preparación" },
      { key: "ingredients", label: "ingredientes" },
      { key: "cookingTime", label: "cocción" },
      { key: "mold", label: "molde" },
      { key: "serves", label: "rinde" },
      { key: "source", label: "fuente:" },
    ];

    // Buscar apariciones válidas
    const puntos = labels
      .map(({ key, label }) => {
        const regex =
          key === "source"
            ? new RegExp(`\\b${label}`, "i")
            : new RegExp(`\\b${label}\\b\\s*\\b${label}\\b`, "i");

        const match = regex.exec(lower);
        if (match) {
          return {
            key,
            label,
            index: match.index,
            matchLength: match[0].length,
          };
        }
        return null;
      })
      .filter(
        (
          x
        ): x is {
          key: string;
          label: string;
          index: number;
          matchLength: number;
        } => x !== null
      )
      .sort((a, b) => a.index - b.index);

    const secciones: Record<string, string | undefined> = {
      title: undefined,
      preparation: undefined,
      ingredients: undefined,
      cookingTime: undefined,
      mold: undefined,
      serves: undefined,
      source: undefined,
    };

    // Título = antes de la primera sección
    if (puntos.length > 0) {
      secciones.title = limpio.slice(0, puntos[0].index).trim();
    } else {
      secciones.title = limpio;
      return secciones;
    }

    // Extraer cada sección desde el final del match completo
    for (let i = 0; i < puntos.length; i++) {
      const { key, label, index, matchLength } = puntos[i];
      const start = index + matchLength;

      const end = i + 1 < puntos.length ? puntos[i + 1].index : undefined;
      const contenido = limpio.slice(start, end).trim();

      // Limpieza final (por si quedó algún duplicado más)
      const limpioContenido = contenido
        .replace(new RegExp(`\\b${label}\\b`, "ig"), "")
        .trim();
      secciones[key] = limpioContenido;
    }

    // return secciones;
    console.log(secciones);
    setTitle(secciones.title);
    if (secciones.ingredients) setIngredients(secciones.ingredients);
    if (secciones.preparation) setSteps(secciones.preparation);
    if (secciones.source) setSource(secciones.source);
    if (secciones.cookingTime) setCookingTime(secciones.cookingTime);
    if (secciones.mold) setMold(secciones.mold);
    if (secciones.serves) setPortions(secciones.serves);
  }

  return (
    <div className={styles.fileUpload}>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      <br />
      <h2>{title}</h2>
      <br />
      <h3>Ingredientes</h3>
      <br />
      <p>{ingredients}</p>
      <br />
      {cookingTime && (
        <>
          <h3>Cocción</h3>
          <br />
          <p>{cookingTime}</p>
          <br />
        </>
      )}
      {mold && (
        <>
          <h3>Molde</h3>
          <br />
          <p>{mold}</p>
          <br />
        </>
      )}
      {portions && (
        <>
          <h3>Rinde</h3>
          <br />
          <p>{portions}</p>
          <br />
        </>
      )}
      {source && (
        <>
          <h3>Fuente</h3>
          <br />
          <p>{source}</p>
          <br />
        </>
      )}
      <h3>Preparación</h3>
      <br />
      <p>{steps}</p>
    </div>
  );
};

export default FileUpload;

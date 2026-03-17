/**
 * HTML template for recipe PDF - matches "Formato Receta Web 3" layout.
 * Duplex margins: @page :left (binding left), @page :right (binding right).
 */

export type RecipePdfData = {
  title: string;
  servings?: string;
  bakingInfo?: string;
  mold?: string;
  /** Author/source name only (no URL) */
  author?: string;
  sourceUrl?: string;
  /** Each item: label for display, iconKey for icon (gluten_free, dairy_free, vegan, vegetarian) */
  dietaryRestrictions?: { label: string; iconKey: string }[];
  subrecipes: {
    title?: string;
    ingredients: { name: string; amount?: number; unit?: string }[];
    instructions: string[];
  }[];
  notes?: string[];
};

function formatIngredient(ing: {
  name: string;
  amount?: number;
  unit?: string;
}): string {
  const amountPart =
    ing.amount != null
      ? `${ing.amount} ${ing.unit || ''}`.trim()
      : ing.unit
        ? String(ing.unit)
        : '';
  return amountPart ? `${ing.name}, ${amountPart}` : ing.name;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Lucide icon SVGs (ISC license) - 14px size for info block
// Paths with explicit spaces for reliable SVG parsing
const ICON_SVG: Record<string, string> = {
  utensils:
    '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2 -2 V 2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  wheat:
    '<path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2 V 6 a 4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>',
  milk: '<path d="M8 2h8"/><path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/><path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  carrot:
    '<path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7z"/><path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z"/><path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z"/>',
  'chef-hat':
    '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
  clock:
    '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  cylinder:
    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/>',
};

const DIETARY_ICON_KEY: Record<string, string> = {
  gluten_free: 'wheat',
  dairy_free: 'milk',
  vegan: 'leaf',
  vegetarian: 'carrot',
};

function iconSvg(name: string, size = 14): string {
  const path = ICON_SVG[name];
  if (!path) return '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

export function buildRecipeHtml(recipe: RecipePdfData): string {
  const hasLeft = !!recipe.author || !!recipe.bakingInfo || !!recipe.mold;
  const hasRight =
    !!recipe.servings || (recipe.dietaryRestrictions?.length ?? 0) > 0;
  const hasInfo = hasLeft || hasRight;

  const dietaryFiltered =
    recipe.dietaryRestrictions?.filter((r) =>
      r.iconKey === 'vegetarian'
        ? !recipe.dietaryRestrictions?.some((x) => x.iconKey === 'vegan')
        : true,
    ) ?? [];

  let infoHtml = '';
  if (hasInfo) {
    const leftItems: string[] = [];
    if (recipe.author) {
      leftItems.push(
        `<div class="info-row"><span class="info-icon">${iconSvg('chef-hat')}</span><span>${escapeHtml(recipe.author)}</span></div>`,
      );
    }
    if (recipe.bakingInfo) {
      leftItems.push(
        `<div class="info-row"><span class="info-icon">${iconSvg('clock')}</span><span>${escapeHtml(recipe.bakingInfo)}</span></div>`,
      );
    }
    if (recipe.mold) {
      leftItems.push(
        `<div class="info-row"><span class="info-icon">${iconSvg('cylinder')}</span><span>${escapeHtml(recipe.mold)}</span></div>`,
      );
    }

    const rightItems: string[] = [];
    if (recipe.servings) {
      rightItems.push(
        `<div class="info-row"><span class="info-icon">${iconSvg('utensils')}</span><span>${escapeHtml(recipe.servings)}</span></div>`,
      );
    }
    dietaryFiltered.forEach((dr) => {
      const iconName = DIETARY_ICON_KEY[dr.iconKey] ?? 'leaf';
      rightItems.push(
        `<div class="info-row"><span class="info-icon">${iconSvg(iconName)}</span><span>${escapeHtml(dr.label)}</span></div>`,
      );
    });

    const showDivider = leftItems.length > 0 && rightItems.length > 0;
    infoHtml = `
      <div class="info-block">
        <div class="info-columns">
          <div class="info-column info-column-left">${leftItems.join('') || '&nbsp;'}</div>
          <div class="info-column info-column-right">${rightItems.join('') || '&nbsp;'}</div>
        </div>
        ${showDivider ? '<div class="info-divider"></div>' : ''}
      </div>`;
  }

  const hasIngredients = recipe.subrecipes.some(
    (s) => s.ingredients && s.ingredients.length > 0,
  );
  const hasInstructions = recipe.subrecipes.some(
    (s) => s.instructions && s.instructions.length > 0,
  );

  let ingredientsHtml = '';
  if (hasIngredients) {
    if (recipe.subrecipes.length === 1) {
      const ings = recipe.subrecipes[0].ingredients || [];
      const mid = Math.ceil(ings.length / 2);
      const left = ings.slice(0, mid);
      const right = ings.slice(mid);
      ingredientsHtml = `
        <section class="section">
          <h2 class="section-title">Ingredientes</h2>
          <div class="ingredient-columns">
            <div class="ingredient-column">
              <ul class="ingredient-list">${left
                .map((i) => `<li>${escapeHtml(formatIngredient(i))}</li>`)
                .join('')}</ul>
            </div>
            <div class="ingredient-column">
              <ul class="ingredient-list">${right
                .map((i) => `<li>${escapeHtml(formatIngredient(i))}</li>`)
                .join('')}</ul>
            </div>
          </div>
        </section>`;
    } else {
      ingredientsHtml = `
        <section class="section">
          <h2 class="section-title">Ingredientes</h2>
          <div class="ingredient-columns">
            ${recipe.subrecipes
              .map(
                (sr) => `
              <div class="ingredient-column">
                ${sr.title ? `<h3 class="subsection-title">${escapeHtml(sr.title)}</h3>` : ''}
                <ul class="ingredient-list">${(sr.ingredients || [])
                  .map((i) => `<li>${escapeHtml(formatIngredient(i))}</li>`)
                  .join('')}</ul>
              </div>`,
              )
              .join('')}
          </div>
        </section>`;
    }
  }

  let preparationHtml = '';
  if (hasInstructions) {
    preparationHtml = `
      <div class="section-divider" data-pdf-divider></div>
      <section class="section">
        <h2 class="section-title">Preparación</h2>
        ${recipe.subrecipes
          .map(
            (sr) => `
          <div class="subrecipe-block">
            ${sr.title ? `<h3 class="subsection-title">${escapeHtml(sr.title)}</h3>` : ''}
            ${(sr.instructions || [])
              .map(
                (step) => `<p class="instruction-text">${escapeHtml(step)}</p>`,
              )
              .join('')}
          </div>`,
          )
          .join('')}
      </section>`;
  }

  const recetaOriginalHtml = recipe.sourceUrl
    ? `
      <div class="section-divider" data-pdf-divider></div>
      <section class="section">
        <h2 class="section-title">Receta original</h2>
        <p class="source-url"><a href="${escapeHtml(recipe.sourceUrl)}">${escapeHtml(recipe.sourceUrl)}</a></p>
      </section>`
    : '';

  const notesHtml =
    recipe.notes && recipe.notes.length > 0
      ? `
      <div class="section-divider" data-pdf-divider></div>
      <section class="section">
        <h2 class="section-title">Notas</h2>
        <ul class="notes-list">
          ${recipe.notes.map((n) => `<li class="note">${escapeHtml(n)}</li>`).join('')}
        </ul>
      </section>`
      : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(recipe.title)}</title>
  <link href="https://fonts.cdnfonts.com/css/bellerose" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Akzidenz Grotesk Light';
      src: url('https://db.onlinewebfonts.com/t/9d85d0fb3f72fbc5061a447e52f3bff9.woff2') format('woff2'),
           url('https://db.onlinewebfonts.com/t/9d85d0fb3f72fbc5061a447e52f3bff9.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @page {
      size: A5;
      margin: 10mm 0;
    }
    @page :left {
      margin-left: 10mm;
      margin-right: 20mm;
    }
    @page :right {
      margin-left: 20mm;
      margin-right: 10mm;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Akzidenz Grotesk Light', Helvetica, Arial, sans-serif;
      font-size: 11pt;
      color: #000;
      line-height: 1.3;
      hyphens: none;
    }
    .page {
      max-width: 100%;
      margin: 0 auto;
    }
    .title {
      font-family: 'Bellerose', sans-serif;
      font-size: 37px; /* 28pt */
      font-weight: 400;
      text-align: center;
      margin: 0 0 14px 0;
      text-transform: uppercase;
    }
    .info-block {
      margin-top: 14px;
      padding: 10px 0;
      border-top: 1px solid #2c3e50;
      border-bottom: 1px solid #2c3e50;
      font-size: 11pt;
      line-height: 1.4;
      position: relative;
    }
    .info-columns {
      display: flex;
      align-items: stretch;
    }
    .info-column {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .info-column-left { padding-right: 12px; }
    .info-column-right { padding-left: 12px; }
    .info-divider {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 1px;
      background: #2c3e50;
      transform: translateX(-50%);
    }
    .info-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .info-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #2c3e50;
    }
    .source-url {
      margin: 0;
      font-size: 10pt;
      word-break: break-all;
      text-align: justify;
    }
    .section {
      margin-top: 14px;
    }
    .section-divider {
      margin-top: 20px;
      height: 1px;
      background: #2c3e50;
    }
    .section-title {
      font-family: 'Bellerose', sans-serif;
      font-size: 21px; /* 16pt */
      font-weight: 400;
      text-align: center;
      margin: 0 0 14px 0;
      text-transform: uppercase;
    }
    .subsection-title {
      font-family: 'Bellerose', sans-serif;
      font-size: 20px; /* 15pt */
      font-weight: 400;
      margin: 0 0 8px 0;
    }
    .ingredient-columns {
      display: flex;
      gap: 8mm;
    }
    .ingredient-column {
      flex: 1;
      min-width: 0;
      text-align: center;
    }
    .ingredient-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .notes-list {
      list-style: disc;
      margin: 0;
      padding-left: 1.5em;
    }
    .ingredient-list li {
      margin-bottom: 0;
    }
    .note {
      margin-bottom: 4px;
      text-align: justify;
    }
    .instruction-text {
      margin: 0 0 4px 0;
      text-align: justify;
      line-height: 1.2;
    }
    .subrecipe-block {
      margin-bottom: 14px;
    }
    .subrecipe-block:last-child {
      margin-bottom: 0;
    }
  </style>
</head>
<body>
  <div class="page">
    <h1 class="title">${escapeHtml(recipe.title)}</h1>
    ${infoHtml}
    ${ingredientsHtml}
    ${preparationHtml}
    ${notesHtml}
    ${recetaOriginalHtml}
  </div>
</body>
</html>`;
}

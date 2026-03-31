/**
 * Measure-style units: plural only when amount > 1 (½ cdta, not ½ cdtas).
 * Others use count-style: plural unless |amount| is exactly 1 (0 planchas, 7 dientes).
 */
const MEASURE_PLURAL_IF_GT_ONE = new Set([
  'cdta',
  'cda',
  'taza',
  'vaso',
  'pzc',
  'cubo',
  'dado',
  'hoja',
  'l',
  'puñado',
]);

function shouldUsePluralAbbrev(n: number, abbreviationSingular: string): boolean {
  const key = abbreviationSingular.toLowerCase();
  if (MEASURE_PLURAL_IF_GT_ONE.has(key)) return n > 1;
  return Math.abs(n) !== 1;
}

/**
 * Pick singular vs plural abbreviation for PDF (matches DB + Spanish count rules).
 * Fallback map covers units if abbreviation_plural is missing in DB (stale seed).
 */
const FALLBACK_PLURAL_ES: Record<string, string> = {
  plancha: 'planchas',
  tapa: 'tapas',
  diente: 'dientes',
  cubo: 'cubos',
  dedal: 'dedales',
  dado: 'dados',
  taza: 'tazas',
  vaso: 'vasos',
  pzc: 'pzcs',
  cdta: 'cdtas',
  cda: 'cdas',
  rodaja: 'rodajas',
  atado: 'atados',
  hoja: 'hojas',
  tallo: 'tallos',
  chorrito: 'chorritos',
  tira: 'tiras',
  'puñado': 'puñados',
  l: 'Lts',
};

export function pickUnitAbbreviationFromDb(
  amount: number | null,
  u: {
    abbreviation_singular: string;
    abbreviation_plural: string | null;
  } | null,
): string | undefined {
  if (!u) return undefined;
  const n = amount == null ? NaN : Number(amount);
  if (Number.isNaN(n)) return u.abbreviation_singular;
  if (!shouldUsePluralAbbrev(n, u.abbreviation_singular)) {
    return u.abbreviation_singular;
  }
  if (u.abbreviation_plural) return u.abbreviation_plural;
  const fb = FALLBACK_PLURAL_ES[u.abbreviation_singular.toLowerCase()];
  return fb ?? u.abbreviation_singular;
}

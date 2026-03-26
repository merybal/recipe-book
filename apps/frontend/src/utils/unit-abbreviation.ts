import type { UnitRaw } from "@/types";

/** Same set as backend `unit-abbreviation.ts` MEASURE_PLURAL_IF_GT_ONE */
const MEASURE_PLURAL_IF_GT_ONE = new Set([
  "cdta",
  "cda",
  "taza",
  "vaso",
  "pzc",
  "cubo",
  "dado",
  "hoja",
]);

function shouldUsePluralAbbrev(n: number, abbreviationSingular: string): boolean {
  const key = abbreviationSingular.toLowerCase();
  if (MEASURE_PLURAL_IF_GT_ONE.has(key)) return n > 1;
  return Math.abs(n) !== 1;
}

/**
 * Pick singular vs plural abbreviation from API unit row (Spanish count rules).
 * Fallback if abbreviation_plural is missing in DB.
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
};

export function pickUnitAbbreviationFromDb(
  amount: number | null | undefined,
  u: UnitRaw | null | undefined,
): string | undefined {
  if (!u) return undefined;
  const n =
    amount === null || amount === undefined ? NaN : Number(amount);
  if (Number.isNaN(n)) return u.abbreviation_singular;
  if (!shouldUsePluralAbbrev(n, u.abbreviation_singular)) {
    return u.abbreviation_singular;
  }
  const plural = u.abbreviation_plural ?? null;
  if (plural) return plural;
  const fb = FALLBACK_PLURAL_ES[u.abbreviation_singular.toLowerCase()];
  return fb ?? u.abbreviation_singular;
}

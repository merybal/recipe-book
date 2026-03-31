-- Liter: SI-style singular L, plural Lts
UPDATE "Units"
SET
  abbreviation_singular = 'L',
  abbreviation_plural = 'Lts'
WHERE abbreviation_singular = 'l'
  AND name_en = 'liter';

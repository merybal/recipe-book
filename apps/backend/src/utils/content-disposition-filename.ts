/**
 * Build Content-Disposition with RFC 5987 UTF-8 filename (filename*=UTF-8''...).
 * Raw UTF-8 in filename="..." is often read as Latin-1, causing mojibake (e.g. ý for í).
 */
export function buildContentDispositionFilename(
  disposition: 'attachment' | 'inline',
  filename: string,
): string {
  const asciiFallback = filename
    .replace(/[^\x20-\x7E]/g, '_')
    .replace(/["\\]/g, '_');
  const encoded = encodeURIComponent(filename);
  return `${disposition}; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`;
}

/**
 * Prefer RFC 5987 filename* (UTF-8) over legacy filename in Content-Disposition.
 */
export function parseFilenameFromContentDisposition(
  header: string | undefined,
): string | undefined {
  if (!header) return undefined;
  const star = /filename\*=UTF-8''([^;\n]+)/i.exec(header);
  if (star) {
    try {
      return decodeURIComponent(star[1].trim());
    } catch {
      return undefined;
    }
  }
  const quoted = /filename="([^"]+)"/i.exec(header);
  if (quoted) return quoted[1];
  return undefined;
}

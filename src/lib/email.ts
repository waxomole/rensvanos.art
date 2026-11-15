/**
 * Builds a mailto: URL from parts. Callers pass the address in pieces
 * (see contactEmail in data/site.ts) so no plaintext email ever appears
 * in the HTML source or the JS bundle.
 */
export function mailtoHref(address: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${address}${query ? `?${query}` : ""}`;
}

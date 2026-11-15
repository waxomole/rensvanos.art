/** Resolve a public/ asset path against the deploy base URL. */
export function asset(path: string): string {
  const base = import.meta.env?.BASE_URL ?? "/";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

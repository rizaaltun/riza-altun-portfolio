/** Keeps static files working at the domain root and under GitHub Pages. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

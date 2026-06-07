export function publicAsset(path) {
  if (!path) return path;

  const value = String(path);
  if (/^(?:[a-z][a-z0-9+.-]*:|data:|blob:|#)/i.test(value)) {
    return value;
  }

  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = value.replace(/^\/+/, "");

  return `${normalizedBase}${normalizedPath}`;
}

export const RESERVED_SLUGS = new Set([
    "",
    "admin",
    "api",
    "urunler",
    "hakkimizda",
    "iletisim",
    "sitemap.xml",
    "robots.txt",
]);

export function sanitizeSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

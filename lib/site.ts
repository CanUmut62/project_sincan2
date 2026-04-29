export function getSiteUrl() {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
    if (!envUrl) return "http://localhost:3000";
    return envUrl.replace(/\/+$/, "");
}

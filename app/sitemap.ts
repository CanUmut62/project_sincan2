import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { getContactSettings } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = getSiteUrl();
    const products = await getProducts();
    const contact = await getContactSettings();
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${siteUrl}/urunler`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${siteUrl}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${siteUrl}/iletisim`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ];

    const contactSlugPage =
        contact.pageSeo.slug && contact.pageSeo.slug !== "iletisim"
            ? [{ url: `${siteUrl}/${contact.pageSeo.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 }]
            : [];

    const productPages = products.map((product) => ({
        url: `${siteUrl}/urunler/${product.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...contactSlugPage, ...productPages];
}

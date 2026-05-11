import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { CATEGORY_PREFIXES, categories, defaultProducts, type Product, type ProductCategory, type ProductSpec } from "@/lib/products-schema";
import { sanitizeSlug } from "@/lib/seo-rules";

const dataDir = path.join(process.cwd(), "data");
const productsPath = path.join(dataDir, "products.json");
const allowedCategories: ProductCategory[] = ["borular", "profiller", "saclar", "hadde"];

const TR_MAP: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
    ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
};

function normalizeTurkish(str: string): string {
    return str.replace(/[çÇğĞıİöÖşŞüÜ]/g, (c) => TR_MAP[c] ?? c);
}

export function generateRefCode(category: ProductCategory, existingProducts: Product[]): string {
    const prefix = CATEGORY_PREFIXES[category] ?? "PRD";
    const maxSeq = existingProducts
        .filter((p) => p.refCode?.startsWith(`SSP-${prefix}-`))
        .map((p) => parseInt(p.refCode!.split("-")[2] ?? "0", 10))
        .reduce((max, n) => (n > max ? n : max), 0);
    const seq = String(maxSeq + 1).padStart(4, "0");
    return `SSP-${prefix}-${seq}`;
}

export function generateSlugFromProduct(title: string, refCode: string): string {
    const titlePart = sanitizeSlug(normalizeTurkish(title));
    const codePart = refCode.toLowerCase().replace(/[^a-z0-9]/g, "-");
    return `${titlePart}-${codePart}`;
}

function sanitizeSpec(spec: Partial<ProductSpec>): ProductSpec {
    return {
        label: String(spec.label ?? "").trim(),
        value: String(spec.value ?? "").trim(),
    };
}

function sanitizeProduct(product: Partial<Product>): Product {
    const category = String(product.category ?? "borular") as ProductCategory;
    return {
        slug: sanitizeSlug(String(product.slug ?? "")),
        refCode: product.refCode ? String(product.refCode).trim() : undefined,
        seoTitle: product.seoTitle ? String(product.seoTitle).trim() : undefined,
        seoDescription: product.seoDescription ? String(product.seoDescription).trim() : undefined,
        category: allowedCategories.includes(category) ? category : "borular",
        badge: String(product.badge ?? "").trim(),
        image: String(product.image ?? "").trim(),
        alt: String(product.alt ?? "").trim(),
        title: String(product.title ?? "").trim(),
        description: String(product.description ?? "").trim(),
        bullets: Array.isArray(product.bullets) ? product.bullets.map((b) => String(b).trim()).filter(Boolean) : [],
        longDescription: String(product.longDescription ?? "").trim(),
        specs: Array.isArray(product.specs) ? product.specs.map((s) => sanitizeSpec(s ?? {})).filter((s) => s.label && s.value) : [],
        usage: Array.isArray(product.usage) ? product.usage.map((u) => String(u).trim()).filter(Boolean) : [],
        delay: product.delay ? String(product.delay).trim() : undefined,
    };
}

export function normalizeProducts(data: unknown): Product[] {
    if (!Array.isArray(data)) return defaultProducts;
    const normalized = data.map((p) => sanitizeProduct((p ?? {}) as Partial<Product>));
    const valid = normalized.filter((p) => p.slug && p.title && p.image);
    return valid.length ? valid : defaultProducts;
}

export async function getProducts(): Promise<Product[]> {
    try {
        const raw = await readFile(productsPath, "utf8");
        return normalizeProducts(JSON.parse(raw));
    } catch {
        return defaultProducts;
    }
}

export async function saveProducts(products: Product[]) {
    await mkdir(dataDir, { recursive: true });
    await writeFile(productsPath, JSON.stringify(products, null, 2), "utf8");
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    const allProducts = await getProducts();
    return allProducts.find((p) => p.slug === slug);
}

export { categories, defaultProducts };
export type { Product, ProductCategory, ProductSpec };

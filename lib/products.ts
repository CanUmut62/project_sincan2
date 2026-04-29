import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { categories, defaultProducts, type Product, type ProductCategory, type ProductSpec } from "@/lib/products-schema";
import { sanitizeSlug } from "@/lib/seo-rules";

const dataDir = path.join(process.cwd(), "data");
const productsPath = path.join(dataDir, "products.json");
const allowedCategories: ProductCategory[] = ["borular", "profiller", "saclar", "hadde"];

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

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { seedCategories, type Category } from "@/lib/category-schema";
import { sanitizeSlug } from "@/lib/seo-rules";

const dataDir = path.join(process.cwd(), "data");
const categoriesPath = path.join(dataDir, "categories.json");

function sanitizeCategory(c: Partial<Category>): Category {
    const key = sanitizeSlug(String(c.key ?? ""));
    const linkRaw = String(c.linkHref ?? "").trim();
    return {
        key,
        label: String(c.label ?? "").trim(),
        short: String(c.short ?? "").trim(),
        description: String(c.description ?? "").trim(),
        image: String(c.image ?? "").trim(),
        linkHref: linkRaw || "/urunler",
    };
}

export function normalizeCategories(list: unknown): Category[] {
    if (!Array.isArray(list)) return [...seedCategories];
    const seen = new Set<string>();
    const out: Category[] = [];
    for (const raw of list) {
        const c = sanitizeCategory((raw ?? {}) as Partial<Category>);
        if (!c.key || !c.label || !c.image) continue;
        if (seen.has(c.key)) continue;
        seen.add(c.key);
        out.push(c);
    }
    return out.length ? out : [...seedCategories];
}

export async function getCategories(): Promise<Category[]> {
    try {
        const raw = await readFile(categoriesPath, "utf8");
        return normalizeCategories(JSON.parse(raw));
    } catch {
        return [...seedCategories];
    }
}

export async function saveCategories(categories: Category[]) {
    await mkdir(dataDir, { recursive: true });
    await writeFile(categoriesPath, JSON.stringify(categories, null, 2), "utf8");
}

export function getCategoryLabel(key: string, list: Category[]): string {
    return list.find((c) => c.key === key)?.label ?? key;
}

export type { Category };

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultHeroSlides, type HeroSlide } from "@/lib/hero-slides-schema";

const dataDir = path.join(process.cwd(), "data");
const slidesPath = path.join(dataDir, "hero-slides.json");

function sanitizeSlide(slide: Partial<HeroSlide>): HeroSlide {
    return {
        image: String(slide.image ?? "").trim(),
        alt: String(slide.alt ?? "").trim(),
        badge: String(slide.badge ?? "").trim(),
        titleLine1: String(slide.titleLine1 ?? "").trim(),
        titleAccent: String(slide.titleAccent ?? "").trim(),
        description: String(slide.description ?? "").trim(),
        primaryHref: String(slide.primaryHref ?? "").trim(),
        primaryLabel: String(slide.primaryLabel ?? "").trim(),
    };
}

export function normalizeHeroSlides(slides: unknown): HeroSlide[] {
    if (!Array.isArray(slides)) return defaultHeroSlides;
    const normalized = slides.map((s) => sanitizeSlide((s ?? {}) as Partial<HeroSlide>));
    const valid = normalized.filter((s) => s.image && s.titleLine1 && s.primaryLabel && s.primaryHref);
    return valid.length ? valid : defaultHeroSlides;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
    try {
        const raw = await readFile(slidesPath, "utf8");
        return normalizeHeroSlides(JSON.parse(raw));
    } catch {
        return defaultHeroSlides;
    }
}

export async function saveHeroSlides(slides: HeroSlide[]) {
    await mkdir(dataDir, { recursive: true });
    await writeFile(slidesPath, JSON.stringify(slides, null, 2), "utf8");
}

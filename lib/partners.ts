import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Partner } from "@/lib/partners-schema";

const dataDir = path.join(process.cwd(), "data");
const partnersPath = path.join(dataDir, "partners.json");

function sanitizePartner(p: Partial<Partner>): Partner {
    return {
        id: String(p.id ?? "").trim(),
        name: String(p.name ?? "").trim(),
        logoUrl: String(p.logoUrl ?? "").trim(),
    };
}

export function normalizePartners(list: unknown): Partner[] {
    if (!Array.isArray(list)) return [];
    const seen = new Set<string>();
    const out: Partner[] = [];
    for (const raw of list) {
        const p = sanitizePartner((raw ?? {}) as Partial<Partner>);
        if (!p.name || !p.logoUrl) continue;
        let id = p.id;
        if (!id || seen.has(id)) {
            id = `p-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        }
        seen.add(id);
        out.push({ id, name: p.name, logoUrl: p.logoUrl });
    }
    return out;
}

export async function getPartners(): Promise<Partner[]> {
    try {
        const raw = await readFile(partnersPath, "utf8");
        return normalizePartners(JSON.parse(raw));
    } catch {
        return [];
    }
}

export async function savePartners(partners: Partner[]) {
    await mkdir(dataDir, { recursive: true });
    await writeFile(partnersPath, JSON.stringify(partners, null, 2), "utf8");
}

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultContactSettings, type ContactInfo, type ContactPerson, type ContactSettings } from "@/lib/contact-schema";
import { sanitizeSlug } from "@/lib/seo-rules";

const dataDir = path.join(process.cwd(), "data");
const contactPath = path.join(dataDir, "contact.json");

function sanitizePerson(person: Partial<ContactPerson>): ContactPerson {
    return {
        name: String(person.name ?? "").trim(),
        role: String(person.role ?? "").trim(),
        display: String(person.display ?? "").trim(),
        tel: String(person.tel ?? "").trim(),
        whatsapp: String(person.whatsapp ?? "").trim(),
    };
}

function sanitizeInfo(info: Partial<ContactInfo>): ContactInfo {
    return {
        email: String(info.email ?? "").trim(),
        addressShort: String(info.addressShort ?? "").trim(),
        addressFull: String(info.addressFull ?? "").trim(),
        workingHours: String(info.workingHours ?? "").trim(),
        mapEmbedSrc: String(info.mapEmbedSrc ?? "").trim(),
    };
}

export function normalizeContactSettings(data: unknown): ContactSettings {
    const raw = (data ?? {}) as Partial<ContactSettings>;
    const persons = Array.isArray(raw.contactPersons)
        ? raw.contactPersons.map((p) => sanitizePerson((p ?? {}) as Partial<ContactPerson>)).filter((p) => p.name && p.tel)
        : [];
    const info = sanitizeInfo((raw.contactInfo ?? {}) as Partial<ContactInfo>);
    const pageSeo = {
        slug: sanitizeSlug(String(raw.pageSeo?.slug ?? defaultContactSettings.pageSeo.slug)) || "iletisim",
        title: String(raw.pageSeo?.title ?? defaultContactSettings.pageSeo.title).trim(),
        description: String(raw.pageSeo?.description ?? defaultContactSettings.pageSeo.description).trim(),
    };

    if (!persons.length || !info.email || !info.addressFull) {
        return defaultContactSettings;
    }

    return { contactPersons: persons, contactInfo: info, pageSeo };
}

export async function getContactSettings(): Promise<ContactSettings> {
    try {
        const raw = await readFile(contactPath, "utf8");
        return normalizeContactSettings(JSON.parse(raw));
    } catch {
        return defaultContactSettings;
    }
}

export async function saveContactSettings(settings: ContactSettings) {
    await mkdir(dataDir, { recursive: true });
    await writeFile(contactPath, JSON.stringify(settings, null, 2), "utf8");
}

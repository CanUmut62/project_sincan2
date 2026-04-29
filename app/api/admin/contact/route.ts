import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-route-auth";
import { getContactSettings, normalizeContactSettings, saveContactSettings } from "@/lib/contact";
import { RESERVED_SLUGS } from "@/lib/seo-rules";
import { getProducts } from "@/lib/products";

export async function GET() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }
    const settings = await getContactSettings();
    return NextResponse.json(settings);
}

export async function PUT(req: Request) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }

    let payload: unknown;
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json({ message: "Geçersiz veri." }, { status: 400 });
    }

    const settings = normalizeContactSettings(payload);
    const slug = settings.pageSeo.slug;
    if (slug !== "iletisim" && RESERVED_SLUGS.has(slug)) {
        return NextResponse.json({ message: `İletişim slug kullanılamaz: ${slug}` }, { status: 400 });
    }
    const products = await getProducts();
    if (products.some((p) => p.slug === slug)) {
        return NextResponse.json({ message: `İletişim slug bir ürünle çakışıyor: ${slug}` }, { status: 400 });
    }

    await saveContactSettings(settings);
    return NextResponse.json({ ok: true, ...settings });
}

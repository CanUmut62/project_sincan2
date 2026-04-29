import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-route-auth";
import { getHeroSlides, normalizeHeroSlides, saveHeroSlides } from "@/lib/hero-slides";

export async function GET() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }
    const slides = await getHeroSlides();
    return NextResponse.json({ slides });
}

export async function PUT(req: Request) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }

    let payload: { slides?: unknown };
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json({ message: "Geçersiz veri." }, { status: 400 });
    }

    const slides = normalizeHeroSlides(payload.slides ?? []);
    await saveHeroSlides(slides);
    return NextResponse.json({ ok: true, slides });
}

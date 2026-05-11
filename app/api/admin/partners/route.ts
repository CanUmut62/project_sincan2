import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-route-auth";
import { getPartners, normalizePartners, savePartners } from "@/lib/partners";

export async function GET() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }
    const partners = await getPartners();
    return NextResponse.json({ partners });
}

export async function PUT(req: Request) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }

    let payload: { partners?: unknown };
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json({ message: "Geçersiz veri." }, { status: 400 });
    }

    const partners = normalizePartners(payload.partners ?? []);
    await savePartners(partners);
    return NextResponse.json({ ok: true, partners });
}

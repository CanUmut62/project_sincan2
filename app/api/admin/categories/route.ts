import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-route-auth";
import { getCategories, normalizeCategories, saveCategories } from "@/lib/categories";

export async function GET() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }
    const categories = await getCategories();
    return NextResponse.json({ categories });
}

export async function PUT(req: Request) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }

    let payload: { categories?: unknown };
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json({ message: "Geçersiz veri." }, { status: 400 });
    }

    const categories = normalizeCategories(payload.categories ?? []);
    await saveCategories(categories);
    return NextResponse.json({ ok: true, categories });
}

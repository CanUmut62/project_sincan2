import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-route-auth";
import { getProducts, normalizeProducts, saveProducts } from "@/lib/products";
import { RESERVED_SLUGS } from "@/lib/seo-rules";

export async function GET() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }
    const products = await getProducts();
    return NextResponse.json({ products });
}

export async function PUT(req: Request) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }

    let payload: { products?: unknown };
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json({ message: "Geçersiz veri." }, { status: 400 });
    }

    const products = normalizeProducts(payload.products ?? []);
    const slugSet = new Set<string>();
    for (const product of products) {
        if (!product.slug) {
            return NextResponse.json({ message: "Ürün slug zorunludur." }, { status: 400 });
        }
        if (RESERVED_SLUGS.has(product.slug)) {
            return NextResponse.json({ message: `Slug kullanılamaz: ${product.slug}` }, { status: 400 });
        }
        if (slugSet.has(product.slug)) {
            return NextResponse.json({ message: `Tekrarlı slug: ${product.slug}` }, { status: 400 });
        }
        slugSet.add(product.slug);
    }

    await saveProducts(products);
    return NextResponse.json({ ok: true, products });
}

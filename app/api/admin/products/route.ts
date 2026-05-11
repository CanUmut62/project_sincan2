import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-route-auth";
import { generateRefCode, generateSlugFromProduct, getProducts, normalizeProducts, saveProducts } from "@/lib/products";
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

    // Auto-assign refCode and slug for products that don't have them yet
    const assigned = products.map((product, idx) => {
        const precedingProducts = products.slice(0, idx);
        if (!product.refCode) {
            const refCode = generateRefCode(product.category, precedingProducts);
            const slug = generateSlugFromProduct(product.title, refCode);
            return { ...product, refCode, slug };
        }
        return product;
    });

    const slugSet = new Set<string>();
    const refCodeSet = new Set<string>();
    for (const product of assigned) {
        if (!product.slug) {
            return NextResponse.json({ message: "Ürün slug zorunludur." }, { status: 400 });
        }
        if (RESERVED_SLUGS.has(product.slug)) {
            return NextResponse.json({ message: `Slug kullanılamaz: ${product.slug}` }, { status: 400 });
        }
        if (slugSet.has(product.slug)) {
            return NextResponse.json({ message: `Tekrarlı slug: ${product.slug}` }, { status: 400 });
        }
        if (product.refCode && refCodeSet.has(product.refCode)) {
            return NextResponse.json({ message: `Tekrarlı referans kodu: ${product.refCode}` }, { status: 400 });
        }
        slugSet.add(product.slug);
        if (product.refCode) refCodeSet.add(product.refCode);
    }

    await saveProducts(assigned);
    return NextResponse.json({ ok: true, products: assigned });
}

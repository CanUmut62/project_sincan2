import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-route-auth";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(req: Request) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const uploadType = searchParams.get("type"); // "hero" | "product"
    const productSlug = searchParams.get("slug") ?? "";

    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
        return NextResponse.json({ message: "Dosya bulunamadı." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ message: "Desteklenmeyen dosya türü." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (uploadType === "product") {
        if (!productSlug) {
            return NextResponse.json({ message: "Ürün slug zorunludur." }, { status: 400 });
        }
        // Sanitize slug for filesystem safety
        const safeSlug = productSlug.replace(/[^a-z0-9-]/g, "").slice(0, 100);
        if (!safeSlug) {
            return NextResponse.json({ message: "Geçersiz slug." }, { status: 400 });
        }
        const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
        await mkdir(uploadDir, { recursive: true });

        const fileName = `${safeSlug}.webp`;
        const filePath = path.join(uploadDir, fileName);

        // Delete old file if exists (same slug, different format)
        for (const ext of ["jpg", "jpeg", "png", "avif", "webp"]) {
            try {
                await unlink(path.join(uploadDir, `${safeSlug}.${ext}`));
            } catch {
                // file didn't exist, ignore
            }
        }

        await sharp(buffer).webp({ quality: 85 }).toFile(filePath);
        return NextResponse.json({ url: `/uploads/products/${fileName}` });
    }

    // Default: hero upload (original behavior, preserve format)
    const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
    const fileName = `hero-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "hero");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), buffer);

    return NextResponse.json({ url: `/uploads/hero/${fileName}` });
}

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-route-auth";

export async function POST(req: Request) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json({ message: "Yetkisiz." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
        return NextResponse.json({ message: "Dosya bulunamadı." }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowed.includes(file.type)) {
        return NextResponse.json({ message: "Desteklenmeyen dosya türü." }, { status: 400 });
    }

    const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
    const fileName = `hero-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "hero");
    await mkdir(uploadDir, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    await writeFile(path.join(uploadDir, fileName), Buffer.from(arrayBuffer));

    return NextResponse.json({ url: `/uploads/hero/${fileName}` });
}

import { NextResponse } from "next/server";
import {
    createAdminSessionToken,
    getAdminCredentials,
    getSessionCookieName,
} from "@/lib/admin-auth";

type LoginRequestBody = {
    username?: string;
    password?: string;
};

export async function POST(req: Request) {
    let body: LoginRequestBody;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ message: "Geçersiz istek." }, { status: 400 });
    }

    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";
    const admin = getAdminCredentials();

    if (username !== admin.username || password !== admin.password) {
        return NextResponse.json({ message: "Kullanıcı adı veya şifre hatalı." }, { status: 401 });
    }

    const token = await createAdminSessionToken(username);
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
        name: getSessionCookieName(),
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8,
    });
    return response;
}

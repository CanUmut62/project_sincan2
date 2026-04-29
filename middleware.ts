import { NextRequest, NextResponse } from "next/server";
import { getSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const isAdminArea = pathname.startsWith("/admin");
    if (!isAdminArea) return NextResponse.next();

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-admin-layout", "1");

    const token = req.cookies.get(getSessionCookieName())?.value;
    const isAuthenticated = await verifyAdminSessionToken(token);
    const isLoginPage = pathname === "/admin/login";

    if (!isAuthenticated && !isLoginPage) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }

    if (isAuthenticated && isLoginPage) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin";
        return NextResponse.redirect(url);
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ["/admin/:path*"],
};

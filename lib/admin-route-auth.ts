import { cookies } from "next/headers";
import { getSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function isAdminAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;
    return verifyAdminSessionToken(token);
}

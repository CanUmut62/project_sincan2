const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 saat

function getEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} environment variable is required`);
    }
    return value;
}

function toHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

async function signPayload(payload: string): Promise<string> {
    const secret = getEnv("ADMIN_SESSION_SECRET");
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(payload)
    );
    return toHex(signature);
}

export function getAdminCredentials() {
    return {
        username: getEnv("ADMIN_USERNAME"),
        password: getEnv("ADMIN_PASSWORD"),
    };
}

export function getSessionCookieName() {
    return SESSION_COOKIE_NAME;
}

export async function createAdminSessionToken(username: string): Promise<string> {
    const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
    const payload = `${username}:${exp}`;
    const signature = await signPayload(payload);
    return `${payload}:${signature}`;
}

export async function verifyAdminSessionToken(token?: string): Promise<boolean> {
    if (!token) return false;
    const parts = token.split(":");
    if (parts.length < 3) return false;

    const signature = parts.pop();
    const expRaw = parts.pop();
    const username = parts.join(":");
    if (!signature || !expRaw || !username) return false;

    const exp = Number(expRaw);
    if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;

    const expected = await signPayload(`${username}:${exp}`);
    return expected === signature;
}

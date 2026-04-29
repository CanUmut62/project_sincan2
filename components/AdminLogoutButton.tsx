"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-industrial-100 text-industrial-800 hover:bg-industrial-200 transition-colors disabled:opacity-60"
        >
            {loading ? "Çıkış..." : "Çıkış Yap"}
        </button>
    );
}

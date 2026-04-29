"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);

        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const data = (await response.json().catch(() => null)) as { message?: string } | null;
            setError(data?.message ?? "Giriş başarısız.");
            setLoading(false);
            return;
        }

        router.push("/admin");
        router.refresh();
    }

    return (
        <main className="min-h-screen bg-industrial-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md bg-white border border-industrial-100 rounded-2xl shadow-sm p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-safety mb-2">Admin</p>
                <h1 className="text-2xl font-bold text-industrial-900 font-montserrat mb-6">Panel Girişi</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-industrial-700 mb-1">
                            Kullanıcı Adı
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-lg border border-industrial-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-safety/40 focus:border-safety"
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-industrial-700 mb-1">
                            Şifre
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-industrial-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-safety/40 focus:border-safety"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error ? <p className="text-sm text-red-600">{error}</p> : null}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-safety text-white font-semibold hover:bg-safety-dark transition-colors disabled:opacity-60"
                    >
                        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </button>
                </form>
            </div>
        </main>
    );
}

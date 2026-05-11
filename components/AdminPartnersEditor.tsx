"use client";

import { ChangeEvent, useEffect, useState } from "react";
import type { Partner } from "@/lib/partners-schema";

function newId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `p-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function emptyPartner(): Partner {
    return {
        id: newId(),
        name: "",
        logoUrl: "",
    };
}

export default function AdminPartnersEditor() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [uploadingId, setUploadingId] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/admin/partners", { cache: "no-store" });
            if (!res.ok) {
                setMessage("İş ortakları verisi alınamadı.");
                setLoading(false);
                return;
            }
            const data = (await res.json()) as { partners: Partner[] };
            setPartners(data.partners);
            setLoading(false);
        }
        void load();
    }, []);

    function updatePartner(id: string, field: keyof Partner, value: string) {
        setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    }

    async function uploadLogo(id: string, file?: File) {
        if (!file) return;
        setUploadingId(id);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("scope", "partners");
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        setUploadingId(null);
        if (!res.ok) {
            setMessage("Logo yüklenemedi.");
            return;
        }
        const data = (await res.json()) as { url: string };
        updatePartner(id, "logoUrl", data.url);
        setMessage("Logo yüklendi.");
    }

    function move(index: number, delta: number) {
        setPartners((prev) => {
            const next = [...prev];
            const j = index + delta;
            if (j < 0 || j >= next.length) return prev;
            const t = next[index];
            next[index] = next[j]!;
            next[j] = t!;
            return next;
        });
    }

    function remove(id: string) {
        setPartners((prev) => prev.filter((p) => p.id !== id));
    }

    async function save() {
        if (partners.length) {
            const incomplete = partners.filter((p) => !p.name.trim() || !p.logoUrl.trim());
            if (incomplete.length) {
                setMessage("Her iş ortağı için firma adı ve logo yüklemesi tamamlanmalı.");
                return;
            }
        }

        setSaving(true);
        setMessage("");
        const res = await fetch("/api/admin/partners", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ partners }),
        });
        setSaving(false);
        if (!res.ok) {
            setMessage("Kayıt sırasında hata oluştu.");
            return;
        }
        const data = (await res.json()) as { partners: Partner[] };
        setPartners(data.partners);
        setMessage("İş ortakları kaydedildi.");
    }

    if (loading) {
        return <p className="text-sm text-industrial-500">Veriler yükleniyor...</p>;
    }

    return (
        <section className="bg-white rounded-2xl border border-industrial-100 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-xl font-bold text-industrial-900 font-montserrat">İş Ortakları</h2>
                    <p className="text-sm text-industrial-500 mt-1">
                        Sadece firma adı ve logo ekleyin; ana sayfadaki şeritte görünür.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setPartners((prev) => [...prev, emptyPartner()])}
                        className="px-4 py-2.5 rounded-xl bg-industrial-100 text-industrial-800 font-medium hover:bg-industrial-200 transition-colors"
                    >
                        + İş ortağı ekle
                    </button>
                    <button
                        type="button"
                        onClick={() => void save()}
                        disabled={saving}
                        className="px-5 py-2.5 rounded-xl bg-safety text-white font-semibold hover:bg-safety-dark transition-colors disabled:opacity-60"
                    >
                        {saving ? "Kaydediliyor..." : "Kaydet"}
                    </button>
                </div>
            </div>

            {partners.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-industrial-200 bg-industrial-50/50 p-12 text-center">
                    <p className="text-industrial-600 font-medium">Henüz iş ortağı yok</p>
                    <p className="text-sm text-industrial-500 mt-2">«İş ortağı ekle» ile isim yazıp logo yükleyin.</p>
                </div>
            ) : (
                <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {partners.map((p, index) => (
                        <li
                            key={p.id}
                            className="group rounded-2xl border border-industrial-100 bg-gradient-to-b from-white to-industrial-50/30 p-5 shadow-sm hover:shadow-md hover:border-safety/25 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-2 mb-4">
                                <div className="flex h-24 w-full max-w-[140px] items-center justify-center rounded-xl bg-white border border-industrial-100 p-3">
                                    {p.logoUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={p.logoUrl} alt="" className="max-h-full max-w-full object-contain" />
                                    ) : (
                                        <span className="text-xs text-industrial-400 text-center">Logo yok</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => move(index, -1)}
                                        disabled={index === 0}
                                        className="rounded-lg px-2 py-1 text-xs font-medium bg-industrial-100 text-industrial-700 hover:bg-industrial-200 disabled:opacity-40 disabled:pointer-events-none"
                                        title="Yukarı"
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => move(index, 1)}
                                        disabled={index === partners.length - 1}
                                        className="rounded-lg px-2 py-1 text-xs font-medium bg-industrial-100 text-industrial-700 hover:bg-industrial-200 disabled:opacity-40 disabled:pointer-events-none"
                                        title="Aşağı"
                                    >
                                        ↓
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-semibold text-industrial-500 uppercase tracking-wide">Firma adı</label>
                                    <input
                                        value={p.name}
                                        onChange={(e) => updatePartner(p.id, "name", e.target.value)}
                                        placeholder="Örn: Örnek A.Ş."
                                        className="mt-1 w-full rounded-lg border border-industrial-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-safety/30"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    <label className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-safety/10 text-safety text-sm font-semibold hover:bg-safety/20 transition-colors cursor-pointer border border-safety/20">
                                        {uploadingId === p.id ? "Yükleniyor..." : "Logo yükle"}
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp,image/avif"
                                            className="hidden"
                                            disabled={uploadingId === p.id}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => void uploadLogo(p.id, e.target.files?.[0])}
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => remove(p.id)}
                                        className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {message ? (
                <p className={`mt-6 text-sm ${message.includes("hata") || message.includes("başarısız") ? "text-red-600" : "text-industrial-600"}`}>
                    {message}
                </p>
            ) : null}
        </section>
    );
}

"use client";

import { ChangeEvent, useEffect, useState } from "react";
import type { Category } from "@/lib/category-schema";
import { sanitizeSlug } from "@/lib/seo-rules";

function emptyCategory(): Category {
    return {
        key: "",
        label: "",
        short: "",
        description: "",
        image: "",
        linkHref: "/urunler",
    };
}

export default function AdminCategoriesEditor() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [uploadingKey, setUploadingKey] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/admin/categories", { cache: "no-store" });
            if (!res.ok) {
                setMessage("Kategori verisi alınamadı.");
                setLoading(false);
                return;
            }
            const data = (await res.json()) as { categories: Category[] };
            setCategories(data.categories);
            setLoading(false);
        }
        void load();
    }, []);

    function updateAt(index: number, field: keyof Category, value: string) {
        setCategories((prev) =>
            prev.map((c, i) => {
                if (i !== index) return c;
                if (field === "key") {
                    return { ...c, key: sanitizeSlug(value) };
                }
                return { ...c, [field]: value };
            })
        );
    }

    function suggestKeyFromLabel(index: number) {
        setCategories((prev) => {
            const c = prev[index];
            if (!c || c.key.trim()) return prev;
            const slug = sanitizeSlug(c.label);
            if (!slug) return prev;
            const next = [...prev];
            next[index] = { ...c, key: slug };
            return next;
        });
    }

    async function uploadImage(index: number, file?: File) {
        if (!file) return;
        const c = categories[index];
        const uploadId = c?.key || `idx-${index}`;
        setUploadingKey(uploadId);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("scope", "categories");
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        setUploadingKey(null);
        if (!res.ok) {
            setMessage("Görsel yüklenemedi.");
            return;
        }
        const data = (await res.json()) as { url: string };
        updateAt(index, "image", data.url);
        setMessage("Kategori görseli yüklendi.");
    }

    function move(index: number, delta: number) {
        setCategories((prev) => {
            const next = [...prev];
            const j = index + delta;
            if (j < 0 || j >= next.length) return prev;
            const t = next[index];
            next[index] = next[j]!;
            next[j] = t!;
            return next;
        });
    }

    function remove(index: number) {
        setCategories((prev) => prev.filter((_, i) => i !== index));
    }

    async function save() {
        if (categories.length) {
            const incomplete = categories.filter((c) => !c.key.trim() || !c.label.trim() || !c.image.trim());
            if (incomplete.length) {
                setMessage("Her kategori için anahtar, başlık ve görsel zorunludur.");
                return;
            }
            const keys = categories.map((c) => c.key.trim());
            if (new Set(keys).size !== keys.length) {
                setMessage("Kategori anahtarları benzersiz olmalı.");
                return;
            }
        }

        setSaving(true);
        setMessage("");
        const res = await fetch("/api/admin/categories", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categories }),
        });
        setSaving(false);
        if (!res.ok) {
            setMessage("Kayıt sırasında hata oluştu.");
            return;
        }
        const data = (await res.json()) as { categories: Category[] };
        setCategories(data.categories);
        setMessage("Kategoriler kaydedildi.");
    }

    if (loading) {
        return <p className="text-sm text-industrial-500">Kategoriler yükleniyor...</p>;
    }

    return (
        <section className="bg-white rounded-2xl border border-industrial-100 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-xl font-bold text-industrial-900 font-montserrat">Kategori Yönetimi</h2>
                    <p className="text-sm text-industrial-500 mt-1">
                        Ana sayfa kategori kartları ve ürün filtreleri bu listeyle senkron çalışır. Anahtar (örn.{" "}
                        <code className="text-xs bg-industrial-100 px-1 rounded">borular</code>) ürün kayıtlarındaki{" "}
                        <strong>kategori</strong> alanı ile eşleşmelidir.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setCategories((prev) => [...prev, emptyCategory()])}
                        className="px-4 py-2.5 rounded-xl bg-industrial-100 text-industrial-800 font-medium hover:bg-industrial-200 transition-colors"
                    >
                        + Kategori ekle
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

            {categories.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-industrial-200 bg-industrial-50/50 p-12 text-center">
                    <p className="text-industrial-600 font-medium">Henüz kategori yok</p>
                    <p className="text-sm text-industrial-500 mt-2">Yeni kategori ekleyip görselleri yükleyin.</p>
                </div>
            ) : (
                <ul className="grid gap-5 lg:grid-cols-2">
                    {categories.map((c, index) => {
                        const uploadBusy = uploadingKey === (c.key || `idx-${index}`);
                        return (
                            <li
                                key={`${c.key}-${index}`}
                                className="rounded-2xl border border-industrial-100 bg-gradient-to-b from-white to-industrial-50/20 p-5 shadow-sm"
                            >
                                <div className="flex gap-4 mb-4">
                                    <div className="h-28 w-40 shrink-0 rounded-xl bg-white border border-industrial-100 overflow-hidden">
                                        {c.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={c.image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-industrial-400">
                                                Görsel yok
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => move(index, -1)}
                                            disabled={index === 0}
                                            className="rounded-lg px-2 py-1 text-xs font-medium bg-industrial-100 text-industrial-700 hover:bg-industrial-200 disabled:opacity-40"
                                        >
                                            ↑
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => move(index, 1)}
                                            disabled={index === categories.length - 1}
                                            className="rounded-lg px-2 py-1 text-xs font-medium bg-industrial-100 text-industrial-700 hover:bg-industrial-200 disabled:opacity-40"
                                        >
                                            ↓
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-semibold text-industrial-500 uppercase tracking-wide">
                                                Anahtar (slug)
                                            </label>
                                            <input
                                                value={c.key}
                                                onChange={(e) => updateAt(index, "key", e.target.value)}
                                                placeholder="ornek-kategori"
                                                className="mt-1 w-full rounded-lg border border-industrial-200 px-3 py-2 text-sm font-mono"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-industrial-500 uppercase tracking-wide">
                                                Liste başlığı
                                            </label>
                                            <input
                                                value={c.label}
                                                onChange={(e) => updateAt(index, "label", e.target.value)}
                                                onBlur={() => suggestKeyFromLabel(index)}
                                                placeholder="Borular"
                                                className="mt-1 w-full rounded-lg border border-industrial-200 px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-industrial-500 uppercase tracking-wide">
                                            Üst etiket (kısa)
                                        </label>
                                        <input
                                            value={c.short}
                                            onChange={(e) => updateAt(index, "short", e.target.value)}
                                            placeholder="Sanayi & Paslanmaz"
                                            className="mt-1 w-full rounded-lg border border-industrial-200 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-industrial-500 uppercase tracking-wide">
                                            Açıklama
                                        </label>
                                        <textarea
                                            value={c.description}
                                            onChange={(e) => updateAt(index, "description", e.target.value)}
                                            rows={3}
                                            className="mt-1 w-full rounded-lg border border-industrial-200 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-industrial-500 uppercase tracking-wide">
                                            Kart linki
                                        </label>
                                        <input
                                            value={c.linkHref}
                                            onChange={(e) => updateAt(index, "linkHref", e.target.value)}
                                            placeholder="/urunler"
                                            className="mt-1 w-full rounded-lg border border-industrial-200 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-industrial-500 uppercase tracking-wide">
                                            Görsel URL
                                        </label>
                                        <input
                                            value={c.image}
                                            onChange={(e) => updateAt(index, "image", e.target.value)}
                                            className="mt-1 w-full rounded-lg border border-industrial-200 px-3 py-2 text-sm font-mono text-xs"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <label className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-safety/10 text-safety text-sm font-semibold border border-safety/20 cursor-pointer hover:bg-safety/20">
                                            {uploadBusy ? "Yükleniyor..." : "Görsel yükle"}
                                            <input
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp,image/avif"
                                                className="hidden"
                                                disabled={uploadBusy}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                    void uploadImage(index, e.target.files?.[0])
                                                }
                                            />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {message ? (
                <p
                    className={`mt-6 text-sm ${
                        message.includes("hata") || message.includes("başarısız") || message.includes("zorunlu") || message.includes("benzersiz")
                            ? "text-red-600"
                            : "text-industrial-600"
                    }`}
                >
                    {message}
                </p>
            ) : null}
        </section>
    );
}

"use client";

import { ChangeEvent, useEffect, useState } from "react";
import type { Category } from "@/lib/category-schema";
import type { Product, ProductCategory } from "@/lib/products-schema";

function emptyProduct(): Product {
    return {
        slug: "",
        category: "borular",
        badge: "Borular",
        image: "",
        alt: "",
        title: "",
        description: "",
        bullets: [],
        longDescription: "",
        usage: [],
    };
}

function toLines(items: string[]) {
    return items.join("\n");
}

function fromLines(text: string) {
    return text.split("\n").map((s) => s.trim()).filter(Boolean);
}

export default function AdminProductsEditor() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function load() {
            const [prodRes, catRes] = await Promise.all([
                fetch("/api/admin/products", { cache: "no-store" }),
                fetch("/api/admin/categories", { cache: "no-store" }),
            ]);
            if (!prodRes.ok) {
                setMessage("Ürün verisi alınamadı.");
                setLoading(false);
                return;
            }
            const data = (await prodRes.json()) as { products: Product[] };
            setProducts(data.products);
            if (catRes.ok) {
                const catData = (await catRes.json()) as { categories: Category[] };
                setCategories(catData.categories);
            }
            setSelectedIndex(0);
            setLoading(false);
        }
        void load();
    }, []);

    function setField(index: number, field: keyof Product, value: string) {
        setProducts((prev) =>
            prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
        );
    }

    async function uploadImage(index: number, file?: File) {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        if (!res.ok) {
            setMessage("Görsel yükleme başarısız.");
            return;
        }
        const data = (await res.json()) as { url: string };
        setField(index, "image", data.url);
        setMessage("Ürün görseli yüklendi.");
    }

    async function save() {
        setSaving(true);
        setMessage("");
        const res = await fetch("/api/admin/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products }),
        });
        setSaving(false);
        setMessage(res.ok ? "Ürünler kaydedildi." : "Ürün kaydı başarısız.");
    }

    if (loading) return <p className="text-sm text-industrial-500 mt-8">Ürünler yükleniyor...</p>;
    const selectedProduct = products[selectedIndex];

    return (
        <section className="bg-white rounded-2xl border border-industrial-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-industrial-900 font-montserrat">Ürün Yönetimi</h2>
                    <p className="text-sm text-industrial-500">Ürün listesi ve detay alanlarını buradan düzenle.</p>
                </div>
                <button
                    type="button"
                    onClick={() =>
                        setProducts((prev) => {
                            const next = [...prev, emptyProduct()];
                            setSelectedIndex(next.length - 1);
                            return next;
                        })
                    }
                    className="px-4 py-2 rounded-lg bg-industrial-100 text-industrial-800 hover:bg-industrial-200 transition-colors"
                >
                    Ürün Ekle
                </button>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr] gap-5">
                <div className="border border-industrial-100 rounded-xl p-3 space-y-2 max-h-[70vh] overflow-auto">
                    {products.map((product, index) => {
                        const active = index === selectedIndex;
                        return (
                            <button
                                key={`${product.slug}-${index}`}
                                type="button"
                                onClick={() => setSelectedIndex(index)}
                                className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                                    active ? "bg-safety text-white" : "bg-industrial-50 text-industrial-800 hover:bg-industrial-100"
                                }`}
                            >
                                <p className="text-sm font-semibold">Ürün {index + 1}</p>
                                <p className={`text-xs truncate ${active ? "text-white/90" : "text-industrial-500"}`}>
                                    {product.title || product.slug || "Yeni ürün"}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {selectedProduct ? (
                    <div className="border border-industrial-100 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-industrial-800">Ürün {selectedIndex + 1} Detayı</p>
                            <button
                                type="button"
                                onClick={() =>
                                    setProducts((prev) => {
                                        const next = prev.filter((_, i) => i !== selectedIndex);
                                        setSelectedIndex((curr) => Math.max(0, Math.min(curr, next.length - 1)));
                                        return next;
                                    })
                                }
                                className="text-sm text-red-600 hover:text-red-700"
                            >
                                Sil
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                            <input value={selectedProduct.slug} onChange={(e) => setField(selectedIndex, "slug", e.target.value)} placeholder="slug (örn: sanayi-borulari)" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={selectedProduct.seoTitle ?? ""} onChange={(e) => setField(selectedIndex, "seoTitle", e.target.value)} placeholder="SEO Title (opsiyonel)" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <select
                                value={selectedProduct.category}
                                onChange={(e) => setField(selectedIndex, "category", e.target.value as ProductCategory)}
                                className="rounded-lg border border-industrial-200 px-3 py-2"
                            >
                                {selectedProduct.category &&
                                !categories.some((c) => c.key === selectedProduct.category) ? (
                                    <option value={selectedProduct.category}>
                                        {selectedProduct.category} (tanımsız kategori)
                                    </option>
                                ) : null}
                                {categories.map((c) => (
                                    <option key={c.key} value={c.key}>
                                        {c.label}
                                    </option>
                                ))}
                            </select>
                            <input value={selectedProduct.title} onChange={(e) => setField(selectedIndex, "title", e.target.value)} placeholder="Başlık" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={selectedProduct.badge} onChange={(e) => setField(selectedIndex, "badge", e.target.value)} placeholder="Badge" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <div className="grid grid-cols-[1fr_auto] gap-2">
                                <input value={selectedProduct.image} onChange={(e) => setField(selectedIndex, "image", e.target.value)} placeholder="Görsel URL" className="rounded-lg border border-industrial-200 px-3 py-2" />
                                <label className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-industrial-100 text-industrial-800 hover:bg-industrial-200 transition-colors cursor-pointer">
                                    Yükle
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp,image/avif"
                                        className="hidden"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => void uploadImage(selectedIndex, e.target.files?.[0])}
                                    />
                                </label>
                            </div>
                            <input value={selectedProduct.alt} onChange={(e) => setField(selectedIndex, "alt", e.target.value)} placeholder="Görsel alt metin" className="rounded-lg border border-industrial-200 px-3 py-2" />
                        </div>

                        <textarea
                            value={selectedProduct.seoDescription ?? ""}
                            onChange={(e) => setField(selectedIndex, "seoDescription", e.target.value)}
                            placeholder="SEO Description (opsiyonel)"
                            rows={2}
                            className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                        />

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-industrial-500 uppercase tracking-wide">
                                Kısa özet (liste kartı ve ürün üst alanı)
                            </label>
                            <textarea
                                value={selectedProduct.description}
                                onChange={(e) => setField(selectedIndex, "description", e.target.value)}
                                placeholder="Ürün kartında ve detay sayfası üst bölümünde görünen kısa metin"
                                rows={3}
                                className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-industrial-500 uppercase tracking-wide">
                                Açıklama (ürün detay — ayrı bölüm)
                            </label>
                            <textarea
                                value={selectedProduct.longDescription}
                                onChange={(e) => setField(selectedIndex, "longDescription", e.target.value)}
                                placeholder="Detay sayfasında “Açıklama” başlığı altında gösterilir. Satır sonları korunur."
                                rows={8}
                                className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                            <textarea
                                value={toLines(selectedProduct.bullets)}
                                onChange={(e) => setProducts((prev) => prev.map((p, i) => (i === selectedIndex ? { ...p, bullets: fromLines(e.target.value) } : p)))}
                                placeholder={"Kart maddeleri (her satıra bir madde)"}
                                rows={4}
                                className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                            />
                            <textarea
                                value={toLines(selectedProduct.usage)}
                                onChange={(e) => setProducts((prev) => prev.map((p, i) => (i === selectedIndex ? { ...p, usage: fromLines(e.target.value) } : p)))}
                                placeholder={"Kullanım alanları (her satıra bir madde)"}
                                rows={4}
                                className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="border border-dashed border-industrial-200 rounded-xl p-8 text-sm text-industrial-500">
                        Ürün bulunamadı. Yeni ürün ekleyebilirsin.
                    </div>
                )}
            </div>

            <div className="mt-6 flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => void save()}
                    disabled={saving}
                    className="px-5 py-2.5 rounded-lg bg-safety text-white font-semibold hover:bg-safety-dark transition-colors disabled:opacity-60"
                >
                    {saving ? "Kaydediliyor..." : "Ürünleri Kaydet"}
                </button>
                {message ? <p className="text-sm text-industrial-600">{message}</p> : null}
            </div>
        </section>
    );
}

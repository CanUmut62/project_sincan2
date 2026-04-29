"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { categories, type Product, type ProductCategory } from "@/lib/products-schema";

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
        specs: [],
        usage: [],
    };
}

function toLines(items: string[]) {
    return items.join("\n");
}

function fromLines(text: string) {
    return text.split("\n").map((s) => s.trim()).filter(Boolean);
}

function specsToLines(specs: Product["specs"]) {
    return specs.map((s) => `${s.label}: ${s.value}`).join("\n");
}

function specsFromLines(text: string): Product["specs"] {
    return text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const idx = line.indexOf(":");
            if (idx === -1) return null;
            const label = line.slice(0, idx).trim();
            const value = line.slice(idx + 1).trim();
            if (!label || !value) return null;
            return { label, value };
        })
        .filter((v): v is { label: string; value: string } => Boolean(v));
}

export default function AdminProductsEditor() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/admin/products", { cache: "no-store" });
            if (!res.ok) {
                setMessage("Ürün verisi alınamadı.");
                setLoading(false);
                return;
            }
            const data = (await res.json()) as { products: Product[] };
            setProducts(data.products);
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
                                {categories.map((c) => (
                                    <option key={c.key} value={c.key}>{c.label}</option>
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

                        <textarea value={selectedProduct.description} onChange={(e) => setField(selectedIndex, "description", e.target.value)} placeholder="Kısa açıklama" rows={2} className="w-full rounded-lg border border-industrial-200 px-3 py-2" />
                        <textarea value={selectedProduct.longDescription} onChange={(e) => setField(selectedIndex, "longDescription", e.target.value)} placeholder="Detay açıklama" rows={4} className="w-full rounded-lg border border-industrial-200 px-3 py-2" />

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

                        <textarea
                            value={specsToLines(selectedProduct.specs)}
                            onChange={(e) => setProducts((prev) => prev.map((p, i) => (i === selectedIndex ? { ...p, specs: specsFromLines(e.target.value) } : p)))}
                            placeholder={"Teknik özellikler (Label: Value formatında, her satıra bir kayıt)"}
                            rows={5}
                            className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                        />
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

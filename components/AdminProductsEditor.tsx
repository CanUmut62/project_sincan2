"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { CATEGORY_PREFIXES, categories, type Product, type ProductCategory } from "@/lib/products-schema";

// ── helpers ────────────────────────────────────────────────────────────────

const TR_MAP: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
    ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
};

function normalizeTurkish(s: string) {
    return s.replace(/[çÇğĞıİöÖşŞüÜ]/g, (c) => TR_MAP[c] ?? c);
}

function titleToSlugPart(title: string) {
    return normalizeTurkish(title)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function buildRefCode(category: ProductCategory, existingProducts: Product[]): string {
    const prefix = CATEGORY_PREFIXES[category] ?? "PRD";
    const maxSeq = existingProducts
        .filter((p) => p.refCode?.startsWith(`SSP-${prefix}-`))
        .map((p) => parseInt(p.refCode!.split("-")[2] ?? "0", 10))
        .reduce((max, n) => (n > max ? n : max), 0);
    const seq = String(maxSeq + 1).padStart(4, "0");
    return `SSP-${prefix}-${seq}`;
}

function buildSlug(title: string, refCode: string) {
    const titlePart = titleToSlugPart(title);
    const codePart = refCode.toLowerCase().replace(/[^a-z0-9]/g, "-");
    return `${titlePart}-${codePart}`;
}

function emptyProduct(allProducts: Product[]): Product {
    const refCode = buildRefCode("borular", allProducts);
    return {
        slug: "",
        refCode,
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

// ── component ──────────────────────────────────────────────────────────────

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

    function updateProduct(index: number, patch: Partial<Product>) {
        setProducts((prev) =>
            prev.map((p, i) => (i === index ? { ...p, ...patch } : p))
        );
    }

    function handleTitleChange(index: number, title: string) {
        const product = products[index];
        if (!product) return;
        const refCode = product.refCode ?? buildRefCode(product.category, products.filter((_, i) => i !== index));
        const slug = title.trim() ? buildSlug(title, refCode) : "";
        updateProduct(index, { title, refCode, slug });
    }

    function handleCategoryChange(index: number, category: ProductCategory) {
        const product = products[index];
        if (!product) return;
        // Re-generate refCode only if this is a new product (no existing refCode)
        const hasExistingRef = !!product.refCode;
        const refCode = hasExistingRef
            ? product.refCode!
            : buildRefCode(category, products.filter((_, i) => i !== index));
        const slug = product.title.trim() ? buildSlug(product.title, refCode) : "";
        updateProduct(index, { category, refCode, slug });
    }

    async function uploadImage(index: number, file?: File) {
        if (!file) return;
        const product = products[index];
        if (!product) return;
        const slug = product.slug;
        if (!slug) {
            setMessage("Görsel yüklemeden önce ürün başlığını girin.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`/api/admin/upload?type=product&slug=${encodeURIComponent(slug)}`, {
            method: "POST",
            body: formData,
        });
        if (!res.ok) {
            setMessage("Görsel yükleme başarısız.");
            return;
        }
        const data = (await res.json()) as { url: string };
        updateProduct(index, { image: data.url });
        setMessage("Ürün görseli yüklendi (WebP).");
    }

    async function save() {
        setSaving(true);
        setMessage("");
        const res = await fetch("/api/admin/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products }),
        });
        const data = (await res.json()) as { ok?: boolean; products?: Product[]; message?: string };
        setSaving(false);
        if (res.ok && data.products) {
            setProducts(data.products);
            setMessage("Ürünler kaydedildi.");
        } else {
            setMessage(data.message ?? "Ürün kaydı başarısız.");
        }
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
                            const newProduct = emptyProduct(prev);
                            setSelectedIndex(prev.length);
                            return [...prev, newProduct];
                        })
                    }
                    className="px-4 py-2 rounded-lg bg-industrial-100 text-industrial-800 hover:bg-industrial-200 transition-colors"
                >
                    Ürün Ekle
                </button>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr] gap-5">
                {/* Sidebar */}
                <div className="border border-industrial-100 rounded-xl p-3 space-y-2 max-h-[70vh] overflow-auto">
                    {products.map((product, index) => {
                        const active = index === selectedIndex;
                        return (
                            <button
                                key={`${product.refCode ?? index}-${index}`}
                                type="button"
                                onClick={() => setSelectedIndex(index)}
                                className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${active ? "bg-safety text-white" : "bg-industrial-50 text-industrial-800 hover:bg-industrial-100"
                                    }`}
                            >
                                <p className="text-sm font-semibold">{product.refCode ?? `Ürün ${index + 1}`}</p>
                                <p className={`text-xs truncate ${active ? "text-white/90" : "text-industrial-500"}`}>
                                    {product.title || "Yeni ürün"}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {/* Editor */}
                {selectedProduct ? (
                    <div className="border border-industrial-100 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-industrial-800">
                                    {selectedProduct.refCode ?? "Yeni Ürün"}
                                </p>
                                {selectedProduct.slug && (
                                    <p className="text-xs text-industrial-400 font-mono">/urunler/{selectedProduct.slug}</p>
                                )}
                            </div>
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

                        {/* Ref code + slug preview (readonly) */}
                        <div className="grid md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-industrial-500 mb-1">Referans Kodu (otomatik)</label>
                                <input
                                    readOnly
                                    value={selectedProduct.refCode ?? ""}
                                    className="w-full rounded-lg border border-industrial-200 px-3 py-2 bg-industrial-50 text-industrial-500 font-mono text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-industrial-500 mb-1">SEO Başlığı (opsiyonel)</label>
                                <input
                                    value={selectedProduct.seoTitle ?? ""}
                                    onChange={(e) => updateProduct(selectedIndex, { seoTitle: e.target.value })}
                                    placeholder="SEO Title"
                                    className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-industrial-500 mb-1">Kategori</label>
                                <select
                                    value={selectedProduct.category}
                                    onChange={(e) => handleCategoryChange(selectedIndex, e.target.value as ProductCategory)}
                                    className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                                >
                                    {categories.map((c) => (
                                        <option key={c.key} value={c.key}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-industrial-500 mb-1">Başlık</label>
                                <input
                                    value={selectedProduct.title}
                                    onChange={(e) => handleTitleChange(selectedIndex, e.target.value)}
                                    placeholder="Ürün başlığı"
                                    className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-industrial-500 mb-1">Badge</label>
                                <input
                                    value={selectedProduct.badge}
                                    onChange={(e) => updateProduct(selectedIndex, { badge: e.target.value })}
                                    placeholder="Badge (örn: Borular)"
                                    className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-industrial-500 mb-1">Görsel Alt Metin</label>
                                <input
                                    value={selectedProduct.alt}
                                    onChange={(e) => updateProduct(selectedIndex, { alt: e.target.value })}
                                    placeholder="Görsel alt metin"
                                    className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                                />
                            </div>
                        </div>

                        {/* Image upload */}
                        <div>
                            <label className="block text-xs text-industrial-500 mb-1">
                                Görsel
                                {selectedProduct.slug && (
                                    <span className="ml-2 text-industrial-400 font-mono">→ {selectedProduct.slug}.webp</span>
                                )}
                            </label>
                            <div className="grid grid-cols-[1fr_auto] gap-2">
                                <input
                                    value={selectedProduct.image}
                                    onChange={(e) => updateProduct(selectedIndex, { image: e.target.value })}
                                    placeholder="Görsel URL"
                                    className="rounded-lg border border-industrial-200 px-3 py-2"
                                />
                                <label className={`inline-flex items-center justify-center px-3 py-2 rounded-lg transition-colors cursor-pointer ${selectedProduct.slug
                                        ? "bg-industrial-100 text-industrial-800 hover:bg-industrial-200"
                                        : "bg-industrial-50 text-industrial-300 cursor-not-allowed"
                                    }`}>
                                    Yükle (WebP)
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp,image/avif"
                                        className="hidden"
                                        disabled={!selectedProduct.slug}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => void uploadImage(selectedIndex, e.target.files?.[0])}
                                    />
                                </label>
                            </div>
                        </div>

                        <textarea
                            value={selectedProduct.seoDescription ?? ""}
                            onChange={(e) => updateProduct(selectedIndex, { seoDescription: e.target.value })}
                            placeholder="SEO Description (opsiyonel)"
                            rows={2}
                            className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                        />

                        <textarea
                            value={selectedProduct.description}
                            onChange={(e) => updateProduct(selectedIndex, { description: e.target.value })}
                            placeholder="Kısa açıklama"
                            rows={2}
                            className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                        />
                        <textarea
                            value={selectedProduct.longDescription}
                            onChange={(e) => updateProduct(selectedIndex, { longDescription: e.target.value })}
                            placeholder="Detay açıklama"
                            rows={4}
                            className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                        />

                        <div className="grid md:grid-cols-2 gap-3">
                            <textarea
                                value={toLines(selectedProduct.bullets)}
                                onChange={(e) => updateProduct(selectedIndex, { bullets: fromLines(e.target.value) })}
                                placeholder={"Kart maddeleri (her satıra bir madde)"}
                                rows={4}
                                className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                            />
                            <textarea
                                value={toLines(selectedProduct.usage)}
                                onChange={(e) => updateProduct(selectedIndex, { usage: fromLines(e.target.value) })}
                                placeholder={"Kullanım alanları (her satıra bir madde)"}
                                rows={4}
                                className="w-full rounded-lg border border-industrial-200 px-3 py-2"
                            />
                        </div>

                        <textarea
                            value={specsToLines(selectedProduct.specs)}
                            onChange={(e) => updateProduct(selectedIndex, { specs: specsFromLines(e.target.value) })}
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

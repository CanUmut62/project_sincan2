"use client";

import { ChangeEvent, useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/hero-slides-schema";

function emptySlide(): HeroSlide {
    return {
        image: "",
        alt: "",
        badge: "",
        titleLine1: "",
        titleAccent: "",
        description: "",
        primaryHref: "/urunler",
        primaryLabel: "Detay",
    };
}

export default function AdminHeroSliderEditor() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/admin/hero-slides", { cache: "no-store" });
            if (!res.ok) {
                setMessage("Slider verisi alınamadı.");
                setLoading(false);
                return;
            }
            const data = (await res.json()) as { slides: HeroSlide[] };
            setSlides(data.slides);
            setSelectedIndex(0);
            setLoading(false);
        }
        void load();
    }, []);

    function updateSlide(index: number, field: keyof HeroSlide, value: string) {
        setSlides((prev) =>
            prev.map((slide, i) => (i === index ? { ...slide, [field]: value } : slide))
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
        updateSlide(index, "image", data.url);
        setMessage("Görsel yüklendi.");
    }

    async function save() {
        setSaving(true);
        setMessage("");
        const res = await fetch("/api/admin/hero-slides", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slides }),
        });
        setSaving(false);
        setMessage(res.ok ? "Hero slider kaydedildi." : "Kayıt sırasında hata oluştu.");
    }

    if (loading) {
        return <p className="text-sm text-industrial-500">Slider yükleniyor...</p>;
    }
    const selectedSlide = slides[selectedIndex];

    return (
        <section className="bg-white rounded-2xl border border-industrial-100 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-industrial-900 font-montserrat">Hero Slider Yönetimi</h2>
                    <p className="text-sm text-industrial-500">Slayt ekle, düzenle, görsel yükle ve kaydet.</p>
                </div>
                <button
                    type="button"
                    onClick={() =>
                        setSlides((prev) => {
                            const next = [...prev, emptySlide()];
                            setSelectedIndex(next.length - 1);
                            return next;
                        })
                    }
                    className="px-4 py-2 rounded-lg bg-industrial-100 text-industrial-800 hover:bg-industrial-200 transition-colors"
                >
                    Slayt Ekle
                </button>
            </div>

            <div className="grid lg:grid-cols-[280px_1fr] gap-5">
                <div className="border border-industrial-100 rounded-xl p-3 space-y-2 max-h-[70vh] overflow-auto">
                    {slides.map((slide, index) => {
                        const active = index === selectedIndex;
                        return (
                            <button
                                key={`${slide.image}-${index}`}
                                type="button"
                                onClick={() => setSelectedIndex(index)}
                                className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                                    active ? "bg-safety text-white" : "bg-industrial-50 text-industrial-800 hover:bg-industrial-100"
                                }`}
                            >
                                <p className="text-sm font-semibold">Slayt {index + 1}</p>
                                <p className={`text-xs truncate ${active ? "text-white/90" : "text-industrial-500"}`}>
                                    {slide.titleLine1 || slide.titleAccent || "Yeni slayt"}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {selectedSlide ? (
                    <div className="border border-industrial-100 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-industrial-800">Slayt {selectedIndex + 1} Detayı</p>
                            <button
                                type="button"
                                onClick={() =>
                                    setSlides((prev) => {
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
                            <input value={selectedSlide.titleLine1} onChange={(e) => updateSlide(selectedIndex, "titleLine1", e.target.value)} placeholder="Başlık satırı" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={selectedSlide.titleAccent} onChange={(e) => updateSlide(selectedIndex, "titleAccent", e.target.value)} placeholder="Vurgulu başlık" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={selectedSlide.badge} onChange={(e) => updateSlide(selectedIndex, "badge", e.target.value)} placeholder="Üst rozet metni" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={selectedSlide.alt} onChange={(e) => updateSlide(selectedIndex, "alt", e.target.value)} placeholder="Görsel alt metni" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={selectedSlide.primaryLabel} onChange={(e) => updateSlide(selectedIndex, "primaryLabel", e.target.value)} placeholder="Buton metni" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={selectedSlide.primaryHref} onChange={(e) => updateSlide(selectedIndex, "primaryHref", e.target.value)} placeholder="Buton linki (örn: /urunler)" className="rounded-lg border border-industrial-200 px-3 py-2" />
                        </div>

                        <textarea value={selectedSlide.description} onChange={(e) => updateSlide(selectedIndex, "description", e.target.value)} placeholder="Açıklama" rows={3} className="w-full rounded-lg border border-industrial-200 px-3 py-2" />

                        <div className="grid md:grid-cols-[1fr_auto] gap-3 items-center">
                            <input value={selectedSlide.image} onChange={(e) => updateSlide(selectedIndex, "image", e.target.value)} placeholder="Görsel URL" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <label className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-industrial-100 text-industrial-800 hover:bg-industrial-200 transition-colors cursor-pointer">
                                Görsel Yükle
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,image/avif"
                                    className="hidden"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => void uploadImage(selectedIndex, e.target.files?.[0])}
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    <div className="border border-dashed border-industrial-200 rounded-xl p-8 text-sm text-industrial-500">
                        Slayt bulunamadı. Yeni slayt ekleyebilirsin.
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
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
                {message ? <p className="text-sm text-industrial-600">{message}</p> : null}
            </div>
        </section>
    );
}

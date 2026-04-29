"use client";

import { useEffect, useState } from "react";
import { defaultContactSettings, type ContactSettings } from "@/lib/contact-schema";

export default function AdminContactEditor() {
    const [settings, setSettings] = useState<ContactSettings>(defaultContactSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/admin/contact", { cache: "no-store" });
            if (!res.ok) {
                setMessage("İletişim verisi alınamadı.");
                setLoading(false);
                return;
            }
            const data = (await res.json()) as ContactSettings;
            setSettings(data);
            setLoading(false);
        }
        void load();
    }, []);

    async function save() {
        setSaving(true);
        setMessage("");
        const res = await fetch("/api/admin/contact", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings),
        });
        setSaving(false);
        setMessage(res.ok ? "İletişim bilgileri kaydedildi." : "Kayıt başarısız.");
    }

    if (loading) return <p className="text-sm text-industrial-500">İletişim verisi yükleniyor...</p>;

    return (
        <section className="bg-white rounded-2xl border border-industrial-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-industrial-900 font-montserrat">İletişim Yönetimi</h2>
            <p className="text-sm text-industrial-500 mt-1 mb-6">Modal, iletişim sayfası, footer ve floating butonlar bu veriyi kullanır.</p>

            <div className="space-y-6">
                {settings.contactPersons.map((person, index) => (
                    <div key={`${person.tel}-${index}`} className="border border-industrial-100 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-industrial-800">Kişi {index + 1}</p>
                            <button
                                type="button"
                                onClick={() =>
                                    setSettings((prev) => ({
                                        ...prev,
                                        contactPersons: prev.contactPersons.filter((_, i) => i !== index),
                                    }))
                                }
                                className="text-sm text-red-600 hover:text-red-700"
                            >
                                Sil
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            <input value={person.name} onChange={(e) => setSettings((prev) => ({ ...prev, contactPersons: prev.contactPersons.map((p, i) => (i === index ? { ...p, name: e.target.value } : p)) }))} placeholder="Ad Soyad" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={person.role} onChange={(e) => setSettings((prev) => ({ ...prev, contactPersons: prev.contactPersons.map((p, i) => (i === index ? { ...p, role: e.target.value } : p)) }))} placeholder="Rol" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={person.display} onChange={(e) => setSettings((prev) => ({ ...prev, contactPersons: prev.contactPersons.map((p, i) => (i === index ? { ...p, display: e.target.value } : p)) }))} placeholder="Görünen telefon" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={person.tel} onChange={(e) => setSettings((prev) => ({ ...prev, contactPersons: prev.contactPersons.map((p, i) => (i === index ? { ...p, tel: e.target.value } : p)) }))} placeholder="tel: için (+90...)" className="rounded-lg border border-industrial-200 px-3 py-2" />
                            <input value={person.whatsapp} onChange={(e) => setSettings((prev) => ({ ...prev, contactPersons: prev.contactPersons.map((p, i) => (i === index ? { ...p, whatsapp: e.target.value } : p)) }))} placeholder="WhatsApp (905...)" className="rounded-lg border border-industrial-200 px-3 py-2 md:col-span-2" />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() =>
                        setSettings((prev) => ({
                            ...prev,
                            contactPersons: [...prev.contactPersons, { name: "", role: "", display: "", tel: "", whatsapp: "" }],
                        }))
                    }
                    className="px-4 py-2 rounded-lg bg-industrial-100 text-industrial-800 hover:bg-industrial-200 transition-colors"
                >
                    Kişi Ekle
                </button>

                <div className="border border-industrial-100 rounded-xl p-4 space-y-3">
                    <p className="font-semibold text-industrial-800">Genel İletişim</p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <input value={settings.contactInfo.email} onChange={(e) => setSettings((prev) => ({ ...prev, contactInfo: { ...prev.contactInfo, email: e.target.value } }))} placeholder="E-posta" className="rounded-lg border border-industrial-200 px-3 py-2" />
                        <input value={settings.contactInfo.workingHours} onChange={(e) => setSettings((prev) => ({ ...prev, contactInfo: { ...prev.contactInfo, workingHours: e.target.value } }))} placeholder="Çalışma saatleri" className="rounded-lg border border-industrial-200 px-3 py-2" />
                        <input value={settings.contactInfo.addressShort} onChange={(e) => setSettings((prev) => ({ ...prev, contactInfo: { ...prev.contactInfo, addressShort: e.target.value } }))} placeholder="Kısa adres" className="rounded-lg border border-industrial-200 px-3 py-2" />
                        <input value={settings.contactInfo.addressFull} onChange={(e) => setSettings((prev) => ({ ...prev, contactInfo: { ...prev.contactInfo, addressFull: e.target.value } }))} placeholder="Tam adres" className="rounded-lg border border-industrial-200 px-3 py-2" />
                        <input value={settings.contactInfo.mapEmbedSrc} onChange={(e) => setSettings((prev) => ({ ...prev, contactInfo: { ...prev.contactInfo, mapEmbedSrc: e.target.value } }))} placeholder="Google map embed src" className="rounded-lg border border-industrial-200 px-3 py-2 md:col-span-2" />
                    </div>
                </div>

                <div className="border border-industrial-100 rounded-xl p-4 space-y-3">
                    <p className="font-semibold text-industrial-800">İletişim Sayfası SEO</p>
                    <div className="grid md:grid-cols-2 gap-3">
                        <input
                            value={settings.pageSeo.slug}
                            onChange={(e) => setSettings((prev) => ({ ...prev, pageSeo: { ...prev.pageSeo, slug: e.target.value } }))}
                            placeholder="Sayfa slug (örn: iletisim)"
                            className="rounded-lg border border-industrial-200 px-3 py-2"
                        />
                        <input
                            value={settings.pageSeo.title}
                            onChange={(e) => setSettings((prev) => ({ ...prev, pageSeo: { ...prev.pageSeo, title: e.target.value } }))}
                            placeholder="SEO Title"
                            className="rounded-lg border border-industrial-200 px-3 py-2"
                        />
                        <textarea
                            value={settings.pageSeo.description}
                            onChange={(e) => setSettings((prev) => ({ ...prev, pageSeo: { ...prev.pageSeo, description: e.target.value } }))}
                            placeholder="SEO Description"
                            rows={2}
                            className="rounded-lg border border-industrial-200 px-3 py-2 md:col-span-2"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => void save()}
                    disabled={saving}
                    className="px-5 py-2.5 rounded-lg bg-safety text-white font-semibold hover:bg-safety-dark transition-colors disabled:opacity-60"
                >
                    {saving ? "Kaydediliyor..." : "İletişimi Kaydet"}
                </button>
                {message ? <p className="text-sm text-industrial-600">{message}</p> : null}
            </div>
        </section>
    );
}

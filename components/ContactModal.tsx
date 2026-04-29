"use client";

import { useEffect, useState } from "react";
import { defaultContactSettings, type ContactInfo, type ContactPerson } from "@/lib/contact-schema";

type ContactModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactSettings.contactInfo);
    const [contactPersons, setContactPersons] = useState<ContactPerson[]>(defaultContactSettings.contactPersons);

    useEffect(() => {
        if (!isOpen) return;
        async function load() {
            const res = await fetch("/api/contact", { cache: "no-store" });
            if (!res.ok) return;
            const data = (await res.json()) as { contactInfo: ContactInfo; contactPersons: ContactPerson[] };
            if (data.contactInfo && Array.isArray(data.contactPersons)) {
                setContactInfo(data.contactInfo);
                setContactPersons(data.contactPersons);
            }
        }
        void load();
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const mapQuery = encodeURIComponent(contactInfo.addressFull);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
    const appleMapsUrl = `https://maps.apple.com/?q=${mapQuery}`;

    return (
        <div className="fixed inset-0 z-[100]" onClick={onClose}>
            <div className="absolute inset-0 bg-industrial-950/60" />
            <div className="relative h-full w-full overflow-y-auto p-4 sm:p-6">
                <div className="min-h-full flex items-center justify-center py-4">
                    <div
                        className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                    <div className="flex items-center justify-between border-b border-industrial-100 px-6 py-5">
                        <div>
                            <p className="text-xs font-semibold tracking-widest uppercase text-safety">Teklif Al</p>
                            <h2 className="text-2xl font-bold text-industrial-900 font-montserrat">Hızlı İletişim</h2>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Modalı kapat"
                            className="rounded-lg p-2 text-industrial-600 hover:bg-industrial-100 hover:text-industrial-900 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 p-6">
                        <div className="bg-industrial-50 rounded-2xl p-5 space-y-6">
                            <div>
                                <h3 className="text-xs font-semibold tracking-widest uppercase text-safety mb-3">Telefon</h3>
                                <div className="space-y-3">
                                    {contactPersons.map((p) => (
                                        <div
                                            key={p.tel}
                                            className="rounded-xl bg-white p-4 border border-industrial-100"
                                        >
                                            <p className="text-base font-bold text-industrial-900">{p.display}</p>
                                            <p className="text-sm text-industrial-500">{p.name} · {p.role}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <a
                                                    href={`tel:${p.tel}`}
                                                    aria-label={`${p.display} numarasını ara`}
                                                    title="Ara"
                                                    className="inline-flex items-center justify-center rounded-lg w-10 h-10 bg-industrial-100 text-industrial-800 hover:bg-industrial-200 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </a>
                                                <a
                                                    href={`https://wa.me/${p.whatsapp}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${p.display} için WhatsApp aç`}
                                                    title="WhatsApp"
                                                    className="inline-flex items-center justify-center rounded-lg w-10 h-10 bg-[#25D366] text-white hover:bg-[#1faa52] transition-colors"
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
                                                        <path d="M380.9 97.1C339 55.1 283.2 32 224.8 32c-120.2 0-218 97.8-218 218 0 38.5 10.1 76.1 29.3 109.2L0 480l123.1-35.9c32 17.5 68 26.7 104.5 26.7h.1c120.2 0 218-97.8 218-218 0-58.4-22.8-114.2-64.8-155.7zM224.8 438.6h-.1c-32.6 0-64.6-8.8-92.5-25.3l-6.6-3.9-73.1 21.3 21.4-71.3-4.3-7c-19.4-30.8-29.6-66.4-29.6-103.1 0-101.7 82.8-184.5 184.7-184.5 49.3 0 95.7 19.2 130.5 54.1 34.8 34.8 54 81.2 53.9 130.5-.1 101.8-82.9 184.6-184.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.4 18-17.7 21.7-3.2 3.7-6.5 4.2-12 .9-32.6-16.3-54-29.1-75.6-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 18.9-19.4 46.1s19.8 53.5 22.6 57.2c2.8 3.7 39 59.6 94.5 83.6 35.1 15.2 48.8 16.5 66.4 13.9 10.7-1.6 32.8-13.4 37.4-26.3 4.6-12.9 4.6-24 3.2-26.3-1.3-2.2-5-3.6-10.5-6.4z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold tracking-widest uppercase text-safety mb-3">E-posta</h3>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="block rounded-xl bg-white p-4 border border-industrial-100 hover:border-safety/30 hover:bg-industrial-50 transition-colors text-base font-semibold text-industrial-900 break-all"
                                >
                                    {contactInfo.email}
                                </a>
                            </div>

                            <div>
                                <h3 className="text-xs font-semibold tracking-widest uppercase text-safety mb-3">Adres</h3>
                                <div className="rounded-xl bg-white p-4 border border-industrial-100">
                                    <p className="text-base font-semibold text-industrial-900">{contactInfo.addressFull}</p>
                                    <p className="text-sm text-industrial-500 mt-1">{contactInfo.workingHours}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <a
                                            href={googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Google Haritalar'da aç"
                                            title="Google Haritalar"
                                            className="inline-flex items-center justify-center rounded-lg w-10 h-10 bg-industrial-100 text-industrial-800 hover:bg-industrial-200 transition-colors"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 2c-4.14 0-7.5 3.27-7.5 7.32 0 5.33 6.72 11.88 7.01 12.15a.7.7 0 0 0 .98 0c.29-.27 7.01-6.82 7.01-12.15C19.5 5.27 16.14 2 12 2Zm0 10.5a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Z" />
                                            </svg>
                                        </a>
                                        <a
                                            href={appleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Apple Haritalar'da aç"
                                            title="Apple Haritalar"
                                            className="inline-flex items-center justify-center rounded-lg w-10 h-10 bg-black text-white hover:bg-zinc-800 transition-colors"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
                                                <path d="M318.7 268.6c-.2-37.8 16.8-66.4 51.2-87.3-19.2-27.5-48.1-42.6-86-45.6-36-2.8-75.2 21-89.6 21-15.1 0-50.1-19.9-77.2-19.9C58.8 137.5 0 185.2 0 273.4c0 26.1 4.8 53.1 14.3 80.9 12.6 36.5 58.1 125.9 105.5 124.4 24.8-.6 42.4-17.7 74.7-17.7 31.4 0 47.7 17.7 75.3 17.7 47.8-.7 89.1-81.9 101.1-118.5-65.8-31-52.2-91.3-52.2-91.6zM261.4 102.2C289.1 69.4 286.3 39.5 285.5 28c-24.5 1.4-52.8 16.6-68.9 35.3-17.7 20.1-28.1 45.1-25.8 73.1 26.5 2.1 50.8-11.4 70.6-34.2z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-industrial-100 bg-white min-h-[320px]">
                            <iframe
                                title="Konum Haritası"
                                src={contactInfo.mapEmbedSrc}
                                className="w-full h-full min-h-[320px]"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

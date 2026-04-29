"use client";

import Link from "next/link";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";

export default function CtaBanner() {
    const [contactModalOpen, setContactModalOpen] = useState(false);

    return (
        <section className="relative bg-deep overflow-hidden">
            {/* dekoratif arka plan deseni */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/95 to-deep/80" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                    <div className="max-w-2xl">
                        <p className="text-safety font-semibold text-sm tracking-widest uppercase mb-3">
                            Hemen Başlayalım
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-montserrat leading-tight">
                            Demir Çelik İhtiyacınız İçin{" "}
                            <span className="text-safety">Hemen Teklif Alın</span>
                        </h2>
                        <p className="mt-4 text-industrial-300 text-lg max-w-xl">
                            25 yıllık deneyimimiz ve geniş stoğumuzla en rekabetçi fiyatı sizin için hazırlıyoruz.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                        <button
                            type="button"
                            onClick={() => setContactModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-safety text-white font-semibold rounded-xl hover:bg-safety-dark transition-colors text-base shadow-lg shadow-safety/20"
                        >
                            Teklif Al
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                        <Link
                            href="/urunler"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors text-base border border-white/20"
                        >
                            Ürünleri Gör
                        </Link>
                    </div>
                </div>
            </div>
            <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
        </section>
    );
}

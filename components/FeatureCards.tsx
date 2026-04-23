"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

type Feature = {
    title: string;
    description: string;
    icon: React.ReactNode;
    delay?: string;
};

const features: Feature[] = [
    {
        title: "Kalite Garantisi",
        description: "TSE ve ISO standartlarına uygun, sertifikalı ürünler. Her parti detaylı kalite kontrolünden geçer.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
        ),
    },
    {
        title: "Hızlı Teslimat",
        description: "Ostim ve Kazan şubelerimizden stoktan teslimat imkanı. Aynı gün sevkiyat seçenekleri.",
        delay: "0.1s",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        ),
    },
    {
        title: "CNC Lazer Kesim",
        description: "Modern CNC teknolojisiyle paslanmaz çelik, alüminyum ve sac malzemelerde hassas kesim.",
        delay: "0.2s",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        ),
    },
    {
        title: "7/24 Destek",
        description: "Uzman satış ekibimizden teknik destek ve fiyat teklifi almak için WhatsApp hattımız aktif.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
        ),
    },
    {
        title: "Geniş Stok",
        description: "Boru, profil, sac ve hadde ürünlerinde zengin stok çeşitliliği ve özel sipariş imkanı.",
        delay: "0.1s",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
        ),
    },
    {
        title: "Rekabetçi Fiyat",
        description: "Doğrudan ithalat ve üretici ilişkileriyle en uygun fiyat garantisi sunuyoruz.",
        delay: "0.2s",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        ),
    },
];

export default function FeatureCards() {
    useScrollReveal();
    return (
        <section
            id="neden-biz"
            className="px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 py-20 lg:py-28 bg-industrial-50 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-96 h-96 bg-safety/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="scroll-reveal text-center mb-16">
                    <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">Neden Biz?</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 mb-6 font-montserrat">
                        Güvenilir Çelik Tedarikçiniz
                    </h2>
                    <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
                        25 yılı aşkın tecrübemizle sektörün öncü firmalarından biri olarak hizmet veriyoruz
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="feature-card scroll-reveal bg-white p-8 rounded-2xl shadow-sm border border-industrial-100"
                            style={f.delay ? { transitionDelay: f.delay } : undefined}
                        >
                            <div className="icon-box w-14 h-14 rounded-xl bg-industrial-50 flex items-center justify-center mb-6 text-safety">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {f.icon}
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-industrial-900 mb-3">{f.title}</h3>
                            <p className="text-industrial-500 leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
    {
        title: "Kalite Garantisi",
        description:
            "TSE ve ISO standartlarına uygun, sertifikalı ürünler. Her parti detaylı kalite kontrolünden geçer.",
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
        description:
            "Ostim ve Kazan şubelerimizden stoktan teslimat imkanı. Aynı gün sevkiyat seçenekleri.",
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
        description:
            "Modern CNC teknolojisiyle paslanmaz çelik, alüminyum ve sac malzemelerde hassas kesim.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
            />
        ),
    },
    {
        title: "7/24 Destek",
        description:
            "Uzman satış ekibimizden teknik destek ve fiyat teklifi için WhatsApp hattımız aktif.",
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
        description:
            "Boru, profil, sac ve hadde ürünlerinde zengin stok çeşitliliği ve özel sipariş imkanı.",
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
        description:
            "Doğrudan ithalat ve üretici ilişkileriyle en uygun fiyat politikası sunuyoruz.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
        ),
    },
];

export default function WhyUs() {
    useScrollReveal();
    return (
        <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                        Neden Biz?
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 mb-6 font-montserrat">
                        Farkımızı Ortaya Koyan Değerler
                    </h2>
                    <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
                        25 yılı aşkın sektör deneyimimizi, müşterilerimize somut avantajlara dönüştürüyoruz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div
                            key={f.title}
                            className="scroll-reveal group flex gap-5 p-6 rounded-2xl border border-industrial-100 bg-industrial-50 hover:bg-white hover:shadow-lg hover:border-safety/30 transition-all duration-300"
                            style={{ transitionDelay: `${i * 0.08}s` }}
                        >
                            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-safety/10 text-safety flex items-center justify-center group-hover:bg-safety group-hover:text-white transition-colors duration-300">
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {f.icon}
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg font-bold text-industrial-900 mb-1.5 font-montserrat">
                                    {f.title}
                                </h3>
                                <p className="text-sm text-industrial-500 leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

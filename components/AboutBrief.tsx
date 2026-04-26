import Link from "next/link";

const highlights = [
    { value: "1998", label: "Kuruluş Yılı" },
    { value: "25+", label: "Yıllık Tecrübe" },
    { value: "2", label: "Modern Şube" },
    { value: "1200+", label: "Mutlu Müşteri" },
];

export default function AboutBrief() {
    return (
        <section className="bg-industrial-50 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Sol: metin */}
                <div>
                    <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                        Hakkımızda
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 font-montserrat mb-6 leading-tight">
                        Ankara'nın Çelik Tedarikinde{" "}
                        <span className="text-safety">25 Yıllık Güven</span>
                    </h2>
                    <p className="text-industrial-600 text-lg leading-relaxed mb-4">
                        Sincan Sac Profil Demir Çelik Ltd. Şti., 1998 yılında Ostim Organize Sanayi Bölgesi'nde küçük bir
                        depoyla başladığı yolculuğunu iki modern şubesi, geniş stok kapasitesi ve uzman kadrosuyla
                        sürdürmektedir.
                    </p>
                    <p className="text-industrial-500 leading-relaxed mb-8">
                        Sanayi boruları, çelik profiller, sac levhalar ve hadde ürünleri başta olmak üzere geniş
                        ürün yelpazemizle inşaat, makina, enerji ve tarım sektörlerinin güvenilir tedarik ortağıyız.
                    </p>
                    <Link
                        href="/hakkimizda"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-deep text-white font-semibold rounded-xl hover:bg-deep-dark transition-colors"
                    >
                        Daha Fazla Bilgi
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Sağ: görsel + stat overlay */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-industrial-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1000&q=80"
                        alt="Çelik depo — Sincan Sac Profil Demir Çelik"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/80 via-transparent to-transparent" />

                    {/* stat bar */}
                    <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 divide-x divide-white/20 bg-deep/80 backdrop-blur-sm">
                        {highlights.map((h) => (
                            <div key={h.label} className="p-4 text-center">
                                <p className="text-xl font-bold text-safety font-montserrat">{h.value}</p>
                                <p className="text-xs text-white/70 leading-tight mt-0.5">{h.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

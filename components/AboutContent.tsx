"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const story = {
    title: "1998'den Bugüne Çelik Sektörünün Güvenilir Adı",
    paragraphs: [
        "Sincan Sac Profil Demir Çelik Ltd. Şti., 1998 yılında Ankara Ostim Organize Sanayi Bölgesi'nde küçük bir depo ile başladığı yolculuğunu, bugün Ostim ve Kazan'daki iki modern şubesinde, geniş stok kapasitesi ve tecrübeli kadrosuyla sürrdürmektedir.",
        "Demir çelik sektöründe 25 yılı aşkın deneyimimizle; sanayi boruları, kare ve dikdörtgen profiller, DKP-HR sac levhalar, NPU/NPI hadde ürünleri, paslanmaz ve galvaniz çelik ürünleri başta olmak üzere geniş bir ürün yelpazesini iş ortaklarımıza sunuyoruz.",
        "Türkiye'nin dört bir yanına ulaşan lojistik ağımız, 5000'i aşkın yıllık başarılı sevkiyatımız ve 1200'ün üzerinde sürekli müşterimizle; inşaat, makina, otomotiv, enerji ve tarım sektörlerinin güvenilir tedarik ortağı olmaya devam ediyoruz.",
    ],
};

const milestones = [
    { year: "1998", title: "Kuruluş", text: "Ostim OSB'de küçük bir depo ile çelik ticaretine adım attık." },
    { year: "2005", title: "İlk Şube Genişlemesi", text: "Artan talep üzerine merkez deposunu büyüttük." },
    { year: "2012", title: "Kazan Şubesi", text: "Lojistik avantaj için Kazan bölgesinde ikinci şubemizi açtık." },
    { year: "2018", title: "CNC Lazer Yatırımı", text: "Modern CNC lazer kesim teknolojisini bünyemize kattık." },
    { year: "2024", title: "Dijital Dönüşüm", text: "Online stok takibi ve hızlı teklif sistemine geçiş yaptık." },
];

const values = [
    {
        title: "Misyonumuz",
        text: "Türkiye sanayisine kaliteli, sertifikalı çelik ürünleri rekabetçi fiyatlarla, hızlı ve güvenilir biçimde ulaştırmak.",
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
        title: "Vizyonumuz",
        text: "Ankara'nın lider çelik tedarikçisi konumumuzu koruyarak, dijital altyapımızla Türkiye'nin tüm sanayi bölgelerine değer katmak.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
        ),
    },
    {
        title: "Değerlerimiz",
        text: "Dürüstlük, kalite, müşteri memnuniyeti, zamanında teslimat ve uzun vadeli iş ortaklığı temel ilkelerimizdir.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        ),
    },
];

export default function AboutContent() {
    useScrollReveal();
    return (
        <>
            {/* HERO / STORY */}
            <section className="relative bg-deep text-white overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="max-w-3xl">
                        <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                            Hakkımızda
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-8 leading-tight">
                            {story.title}
                        </h1>
                        <div className="space-y-5 text-industrial-200 text-lg leading-relaxed">
                            {story.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MISSION / VISION / VALUES */}
            <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((v) => (
                            <div
                                key={v.title}
                                className="scroll-reveal bg-industrial-50 p-8 rounded-2xl border border-industrial-100"
                            >
                                <div className="w-14 h-14 rounded-xl bg-safety/10 text-safety flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {v.icon}
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-industrial-900 mb-3 font-montserrat">{v.title}</h3>
                                <p className="text-industrial-600 leading-relaxed">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TIMELINE */}
            <section className="bg-industrial-50 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                            Yolculuğumuz
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 font-montserrat">
                            Kurumsal Tarihçemiz
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-industrial-200 md:-translate-x-1/2" />
                        <div className="space-y-10">
                            {milestones.map((m, i) => (
                                <div
                                    key={m.year}
                                    className={`scroll-reveal relative md:flex md:items-center md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    <div className="md:w-1/2 pl-12 md:pl-0 md:px-8">
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-industrial-100">
                                            <span className="text-safety font-bold text-sm tracking-widest uppercase">
                                                {m.year}
                                            </span>
                                            <h3 className="text-xl font-bold text-industrial-900 mt-1 mb-2 font-montserrat">
                                                {m.title}
                                            </h3>
                                            <p className="text-industrial-600 text-sm leading-relaxed">{m.text}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block md:w-1/2" />
                                    <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 w-3 h-3 rounded-full bg-safety border-4 border-industrial-50 -translate-x-1/2 md:-translate-y-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

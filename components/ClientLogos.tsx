const companies = [
    { name: "Kılıç İnşaat", sector: "İnşaat", initials: "Kİ", color: "bg-[#1E3A5F]" },
    { name: "Tekno Makina", sector: "Makina", initials: "TM", color: "bg-[#FF5733]" },
    { name: "Atlas Enerji", sector: "Enerji", initials: "AE", color: "bg-[#1E3A5F]" },
    { name: "Yeşilova Tarım", sector: "Tarım", initials: "YT", color: "bg-[#2e7d32]" },
    { name: "Türksan Otomotiv", sector: "Otomotiv", initials: "TO", color: "bg-[#FF5733]" },
    { name: "Pınar Gıda", sector: "Gıda", initials: "PG", color: "bg-[#1565c0]" },
    { name: "Metalim Endüstri", sector: "Sanayi", initials: "ME", color: "bg-[#1E3A5F]" },
    { name: "Güneş Enerji", sector: "Enerji", initials: "GE", color: "bg-[#f57f17]" },
    { name: "Demir-Al Yapı", sector: "İnşaat", initials: "DA", color: "bg-[#FF5733]" },
    { name: "ProMakina A.Ş.", sector: "Makina", initials: "PM", color: "bg-[#1E3A5F]" },
    { name: "Sarıkaya Metal", sector: "Metal", initials: "SM", color: "bg-[#4a148c]" },
    { name: "Ova Tarım Ltd.", sector: "Tarım", initials: "OT", color: "bg-[#2e7d32]" },
];

const doubled = [...companies, ...companies];

export default function ClientLogos() {
    return (
        <section className="bg-white border-y border-industrial-100 py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
                <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-3 block">
                    Referans Firmalarımız
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 font-montserrat">
                    Güven Duyan İş Ortakları
                </h2>
                <p className="mt-3 text-industrial-500 max-w-xl mx-auto">
                    Türkiye'nin farklı sektörlerindeki firmalar uzun süredir bizimle çalışmaktadır.
                </p>
            </div>

            <div className="overflow-hidden">
                <div className="marquee-track flex gap-4 w-max">
                    {doubled.map((c, i) => (
                        <div
                            key={`${c.name}-${i}`}
                            className="flex items-center gap-3 px-5 py-3.5 bg-industrial-50 border border-industrial-100 rounded-2xl flex-shrink-0 hover:border-safety/40 hover:bg-white hover:shadow-md transition-all duration-300 group cursor-default"
                        >
                            <div
                                className={`w-11 h-11 rounded-xl ${c.color} text-white flex items-center justify-center font-bold text-sm font-montserrat flex-shrink-0 shadow-sm`}
                            >
                                {c.initials}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-industrial-900 whitespace-nowrap leading-tight">
                                    {c.name}
                                </p>
                                <p className="text-xs text-industrial-400 whitespace-nowrap">{c.sector}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .marquee-track {
                    animation: marquee 40s linear infinite;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}

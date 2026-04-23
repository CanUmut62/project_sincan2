const steps = [
    {
        step: "01",
        title: "Ürün Seçin",
        description:
            "Web sitemizden veya telefonla ihtiyacınız olan ürün kategorisini ve boyutlarını belirleyin.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
        ),
    },
    {
        step: "02",
        title: "Teklif Alın",
        description:
            "Uzman ekibimiz stok ve fiyat bilgisini kontrol ederek size en kısa sürede teklif sunar.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
        ),
    },
    {
        step: "03",
        title: "Siparişi Onaylayın",
        description:
            "Teklifi onayladıktan sonra ödeme ve teslimat detaylarını birlikte belirleriz.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        ),
    },
    {
        step: "04",
        title: "Teslim Alın",
        description:
            "Ostim veya Kazan şubemizden hızlı sevkiyat ya da nakliye ile kapınıza kadar teslimat.",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
        ),
    },
];

export default function ProcessSteps() {
    return (
        <section className="bg-industrial-50 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                        Sipariş Sürecimiz
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 font-montserrat">
                        4 Adımda Kolay Tedarik
                    </h2>
                </div>

                {/* Desktop: yatay zincir */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-0 relative">
                    {/* bağlantı çizgisi */}
                    <div
                        className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-industrial-200"
                        aria-hidden="true"
                    />
                    {steps.map((s) => (
                        <div key={s.step} className="relative flex flex-col items-center text-center px-4">
                            <div className="relative z-10 w-20 h-20 rounded-full bg-white border-4 border-industrial-200 flex items-center justify-center mb-6 shadow-sm">
                                <svg
                                    className="w-8 h-8 text-safety"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {s.icon}
                                </svg>
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-safety text-white text-xs font-bold flex items-center justify-center leading-none">
                                    {s.step}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-industrial-900 font-montserrat mb-2">
                                {s.title}
                            </h3>
                            <p className="text-sm text-industrial-500 leading-relaxed max-w-[200px]">
                                {s.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Mobile: dikey liste */}
                <div className="lg:hidden space-y-0">
                    {steps.map((s, i) => (
                        <div key={s.step} className="flex gap-5">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-white border-2 border-industrial-200 flex items-center justify-center flex-shrink-0 shadow-sm relative">
                                    <svg
                                        className="w-5 h-5 text-safety"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {s.icon}
                                    </svg>
                                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-safety text-white text-xs font-bold flex items-center justify-center leading-none">
                                        {s.step}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="w-px flex-1 bg-industrial-200 my-1" />
                                )}
                            </div>
                            <div className={`pb-8 pt-1 ${i === steps.length - 1 ? "" : ""}`}>
                                <h3 className="text-lg font-bold text-industrial-900 font-montserrat mb-1">
                                    {s.title}
                                </h3>
                                <p className="text-sm text-industrial-500 leading-relaxed">
                                    {s.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

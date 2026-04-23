"use client";
import { useState } from "react";

const faqs = [
    {
        q: "Minimum sipariş miktarı nedir?",
        a: "Ürün grubuna göre değişmekle birlikte çoğu üründe paket ya da boy bazlı minimum sipariş şartımız bulunmaktadır. Kesin bilgi için satış ekibimizle iletişime geçmenizi öneririz.",
    },
    {
        q: "Aynı gün teslimat yapıyor musunuz?",
        a: "Ankara içi siparişlerde stokta bulunan ürünler için aynı gün sevkiyat imkânı sunuyoruz. Ankara dışı siparişler ise anlaşmalı kargo ve nakliyecilerle 1-3 iş günü içinde teslim edilmektedir.",
    },
    {
        q: "Fiyat teklifi nasıl alabilirim?",
        a: "Sitemizin İletişim sayfasındaki telefon numaralarını arayarak, WhatsApp üzerinden mesaj göndererek veya e-posta yoluyla ürün adı, ölçü ve miktarı belirtip fiyat teklifi talep edebilirsiniz. Teklifler genellikle birkaç saat içinde iletilmektedir.",
    },
    {
        q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        a: "Nakit, havale/EFT ve çek ile ödeme kabul ediyoruz. Kurumsal müşterilerimiz için vadeli ödeme seçenekleri de mevcuttur; detaylar için satış ekibimizle görüşebilirsiniz.",
    },
    {
        q: "Ürünlerinizin kalite belgeleri var mı?",
        a: "Tedarik ettiğimiz tüm ürünler TSE standartlarına ve ilgili Avrupa normlarına (EN) uygundur. Talep üzerine malzeme test sertifikaları (MTC) temin edilebilmektedir.",
    },
    {
        q: "Kesim ve işleme hizmetleri sunuyor musunuz?",
        a: "Evet, boy kesim hizmeti sunuyoruz. Müşteriye özel ölçülerde kesim yapılabilmektedir. Daha kapsamlı işleme ihtiyaçlarınız için lütfen bizimle iletişime geçin.",
    },
    {
        q: "Türkiye genelinde teslimat yapıyor musunuz?",
        a: "Evet, anlaşmalı nakliye firmalarımız aracılığıyla Türkiye'nin her iline teslimat gerçekleştiriyoruz. Büyük tonajlı siparişler için özel nakliye çözümleri de sunmaktayız.",
    },
];

export default function Faq() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="bg-white border-t border-industrial-100 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                        SSS
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 font-montserrat">
                        Sıkça Sorulan Sorular
                    </h2>
                    <p className="mt-4 text-industrial-500 max-w-xl mx-auto text-lg">
                        Aklınızdaki soruların cevabını burada bulamazsanız bize ulaşmaktan çekinmeyin.
                    </p>
                </div>

                <div className="flex flex-col divide-y divide-industrial-100 border border-industrial-100 rounded-2xl overflow-hidden shadow-sm">
                    {faqs.map((faq, i) => (
                        <div key={i}>
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                aria-expanded={open === i}
                                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-industrial-50 transition-colors group"
                            >
                                <span className="text-industrial-900 font-semibold text-base group-hover:text-deep transition-colors">
                                    {faq.q}
                                </span>
                                <span
                                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${open === i
                                            ? "bg-safety border-safety text-white rotate-45"
                                            : "bg-white border-industrial-200 text-industrial-400"
                                        }`}
                                >
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <line x1="7" y1="1" x2="7" y2="13" />
                                        <line x1="1" y1="7" x2="13" y2="7" />
                                    </svg>
                                </span>
                            </button>

                            {open === i && (
                                <div className="px-6 pb-5">
                                    <p className="text-industrial-600 leading-relaxed text-sm">
                                        {faq.a}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-center mt-8 text-industrial-500 text-sm">
                    Başka sorunuz mu var?{" "}
                    <a href="/iletisim" className="text-safety font-semibold hover:underline">
                        Bizimle iletişime geçin →
                    </a>
                </p>
            </div>
        </section>
    );
}

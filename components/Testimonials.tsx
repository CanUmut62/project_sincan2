// Google Reviews tarzı yorumlar.
// Gerçek Google yorumlarını buraya ekleyin: name, company, city, quote, rating (1-5)
const testimonials = [
    {
        quote:
            "Sincan Sac Profil Demir Çelik ile çalışmak iş süreçlerimizi ciddi ölçüde hızlattı. Stok her zaman hazır, teslimat zamanında ve fiyatlar gerçekten rekabetçi. Kesinlikle tavsiye ederim.",
        name: "Ahmet Karataş",
        company: "Karataş İnşaat",
        city: "Ankara",
        timeAgo: "2 ay önce",
        rating: 5,
    },
    {
        quote:
            "Makina imalatında kullandığımız profil ve sac ürünleri için yıllardır tercihimiz. Kalite ve fiyat dengesi mükemmel, ekip çok ilgili ve bilgili.",
        name: "Murat Doğan",
        company: "Doğan Makina Ltd.",
        city: "Ankara",
        timeAgo: "5 ay önce",
        rating: 5,
    },
    {
        quote:
            "Paslanmaz çelik boru ihtiyacımızda hem hız hem kalite açısından beklentimizi her zaman karşıladılar. Aynı gün sevkiyat gerçekten büyük avantaj.",
        name: "Serhat Yıldız",
        company: "Yıldız Gıda A.Ş.",
        city: "Konya",
        timeAgo: "1 ay önce",
        rating: 5,
    },
    {
        quote:
            "Ostim şubesinden yıllardır alışveriş yapıyoruz. Geniş stok yelpazesi ve güler yüzlü personel ile her zaman memnun ayrıldık.",
        name: "Kemal Arslan",
        company: "Arslan Çelik",
        city: "Ankara",
        timeAgo: "3 ay önce",
        rating: 5,
    },
    {
        quote:
            "Fiyat teklifi çok hızlı geldi, ürün kalitesi de beklentinin üzerindeydi. Çelik tedarikinde artık tek adresimiz Sincan Sac Profil.",
        name: "Hasan Çelik",
        company: "Çelik Tarım Ekipmanları",
        city: "Eskişehir",
        timeAgo: "6 ay önce",
        rating: 5,
    },
    {
        quote:
            "Galvaniz profil siparişimiz zamanında, eksiksiz ve iyi paketlenmiş geldi. Lojistik ve ürün kalitesi tam istediğimiz gibi.",
        name: "Ömer Kaya",
        company: "Kaya Yapı",
        city: "Ankara",
        timeAgo: "4 ay önce",
        rating: 5,
    },
];

// Google logosu (renkli G)
function GoogleIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-label="Google">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5" aria-label={`${count} yıldız`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < count ? "text-[#FBBC05]" : "text-industrial-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function Testimonials() {
    return (
        <section className="bg-industrial-50 border-t border-industrial-100 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                        Müşteri Yorumları
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 font-montserrat">
                        Müşterilerimiz Ne Diyor?
                    </h2>
                    <p className="mt-4 text-industrial-500 max-w-xl mx-auto text-lg">
                        Gerçek iş ortaklarımızdan gelen görüşler.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <figure
                            key={t.name}
                            className="bg-white border border-industrial-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Google Review başlık satırı */}
                            <div className="flex items-center justify-between">
                                <StarRating count={t.rating} />
                                <GoogleIcon />
                            </div>

                            <blockquote className="text-industrial-600 leading-relaxed flex-1 text-sm">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>

                            <figcaption className="flex items-center gap-3 pt-4 border-t border-industrial-100">
                                <div className="w-10 h-10 rounded-full bg-deep text-white flex items-center justify-center flex-shrink-0 font-bold text-sm font-montserrat">
                                    {t.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-industrial-900 font-semibold text-sm truncate">{t.name}</p>
                                    <p className="text-industrial-500 text-xs truncate">{t.company} · {t.city}</p>
                                    <p className="text-industrial-400 text-xs">{t.timeAgo}</p>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

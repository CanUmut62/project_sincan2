"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroFactoryBg from "@/presentation-of-new-equipment-in-factory.jpg";

const stats = [
    { value: "15", label: "Yıllık Sektör Tecrübesi" },
    { value: "2.500+", label: "Tamamlanmış Proje" },
    { value: "23K+", label: "Teslim Edilen Ürün" },
];

export default function AboutContent() {
    useScrollReveal();
    return (
        <>
            <section className="relative bg-deep text-white overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.22]"
                    style={{
                        backgroundImage: `url(${heroFactoryBg.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="max-w-3xl">
                        <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                            Hakkımızda
                        </span>
                        <p className="text-industrial-200 text-lg md:text-xl font-semibold mb-3">Sincan Sac Profil</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-10 leading-tight">
                            Gücün ve Güvenin Buluştuğu Nokta
                        </h1>
                        <div className="space-y-5 text-industrial-200 text-lg leading-relaxed">
                            <p>
                                Sincan Sac Profil olarak, Türkiye&apos;nin sanayi ve yapı sektöründe güçlü bir çözüm
                                ortağı olmanın haklı gururunu yaşıyoruz. Kurulduğumuz günden bu yana, sac ve profil
                                alanında uzmanlaşmış kadromuz, geniş ürün yelpazemiz ve yüksek kaliteli üretim
                                anlayışımızla müşterilerimize güvenilir çözümler sunuyoruz.
                            </p>
                            <p>
                                Ankara&apos;nın önemli sanayi bölgelerinden biri olan Sincan&apos;da faaliyet gösteren
                                firmamız; yalnızca ürün tedarik eden bir işletme değil, müşterilerinin ihtiyaçlarını
                                anlayan, analiz eden ve en doğru çözümü sunan stratejik bir iş ortağıdır.
                            </p>
                        </div>
                    </div>

                    <div className="mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="scroll-reveal rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-8 text-center sm:text-left"
                            >
                                <p className="text-4xl md:text-5xl font-bold font-montserrat text-white tabular-nums">
                                    {s.value}
                                </p>
                                <p className="mt-2 text-industrial-200 text-sm md:text-base font-medium leading-snug">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="max-w-3xl mx-auto scroll-reveal">
                    <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 font-montserrat mb-6">
                        Güçlü Altyapı, Etkili Tedarik
                    </h2>
                    <div className="space-y-5 text-industrial-600 text-lg leading-relaxed">
                        <p>
                            Sincan Sac Profil, teknolojik donanımı ve üretim kapasitesiyle sektörün önde gelen
                            firmaları arasında yer alır. Modern makinelerle donatılmış üretim hatlarımız, yüksek
                            hassasiyetli kesim, boyutlandırma ve şekillendirme işlemleri ile her ölçekteki projeye
                            özel çözümler sunmamıza imkân tanır.
                        </p>
                        <p>
                            Depo ve lojistik altyapımız sayesinde hızlı sevkiyat ve zamanında teslimat ilkeleriyle
                            çalışır, müşterilerimizin operasyon süreçlerini aksatmadan destekleriz. Bugün hem kamu
                            projelerinde hem özel sektör yatırımlarında güvenle tercih edilen bir tedarik noktası
                            haline geldik.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-industrial-50 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="max-w-3xl mx-auto scroll-reveal">
                    <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 font-montserrat mb-6">
                        Ürün Kalitesi Kadar İnsana da Yatırım
                    </h2>
                    <div className="space-y-5 text-industrial-600 text-lg leading-relaxed">
                        <p>
                            Kaliteli ürün üretmek, yalnızca doğru hammadde ve ekipmanla değil; aynı zamanda bilgi,
                            tecrübe ve etik değerlerle de mümkündür.
                        </p>
                        <p>
                            Sincan Sac Profil olarak, sadece teknik olarak değil, insani değerler ve etik iş anlayışıyla
                            da sektörümüzde fark yaratıyoruz.
                        </p>
                        <p>
                            Çalışanlarımızın sürekli gelişimine önem veriyor, iş güvenliği ve mesleki eğitim
                            konularında yüksek standartlarda faaliyet gösteriyoruz. İşimizi &quot;iş&quot; olmaktan
                            çıkarıp bir değer üretim sürecine dönüştürüyoruz.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="max-w-3xl mx-auto scroll-reveal">
                    <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 font-montserrat mb-6">
                        Binlerce Proje, Tek Bir Hedef: Memnuniyet
                    </h2>
                    <div className="space-y-5 text-industrial-600 text-lg leading-relaxed">
                        <p>
                            Kurulduğumuz günden bu yana farklı sektörlere ve ihtiyaçlara yönelik binlerce başarılı
                            projeyi hayata geçirdik. İnşaat, sanayi, altyapı, makine imalatı ve daha birçok alanda,
                            ürünlerimizle değer kattık.
                        </p>
                        <p>Her projede benimsediğimiz temel hedef şudur:</p>
                        <blockquote className="border-l-4 border-safety pl-6 py-1 my-6 text-industrial-800 text-xl font-semibold font-montserrat leading-snug">
                            Müşteri memnuniyetini sadece bir sonuç değil, bir süreç olarak yönetmek.
                        </blockquote>
                        <p>
                            Geri bildirimi dikkate alan, sürekli gelişen ve yenilikleri takip eden bir yapıyla
                            çalışıyor; sektörümüzün geleceğini şekillendirmeye katkı sunuyoruz.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

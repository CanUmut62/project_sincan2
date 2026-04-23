import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products, categories } from "@/lib/products";

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export function generateStaticParams(): Params[] {
    return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) {
        return { title: "Ürün bulunamadı" };
    }
    return {
        title: `${product.title} | Yakup Yılmaz Boru Profil A.Ş.`,
        description: product.longDescription.slice(0, 160),
    };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();

    const categoryLabel =
        categories.find((c) => c.key === product.category)?.label ?? product.badge;

    return (
        <main className="pt-24">
            {/* Breadcrumb */}
            <div className="bg-industrial-50 border-b border-industrial-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-industrial-500 flex items-center gap-2">
                    <Link href="/" className="hover:text-safety">Ana Sayfa</Link>
                    <span>/</span>
                    <Link href="/urunler" className="hover:text-safety">Ürünler</Link>
                    <span>/</span>
                    <span className="text-industrial-900 font-medium">{product.title}</span>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-industrial-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={product.image.replace("w=600", "w=1200")}
                            alt={product.alt}
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute top-5 left-5 px-3 py-1 bg-safety text-white text-xs font-semibold rounded-full">
                            {categoryLabel}
                        </span>
                    </div>
                    <div>
                        <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-3 block">
                            Ürün Detayı
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-industrial-900 font-montserrat mb-6">
                            {product.title}
                        </h1>
                        <p className="text-industrial-600 text-lg leading-relaxed mb-8">
                            {product.longDescription}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/iletisim"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-safety text-white font-semibold rounded-lg hover:bg-safety-dark transition-colors"
                            >
                                Teklif Al
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/urunler"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-industrial-800 font-semibold rounded-lg border border-industrial-200 hover:border-safety hover:text-safety transition-colors"
                            >
                                Tüm Ürünler
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specs */}
            <section className="bg-industrial-50 px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 font-montserrat mb-3">
                        Teknik Özellikler
                    </h2>
                    <p className="text-industrial-500 mb-10">
                        Ürün ebatları, kalite sınıfı ve standart bilgileri.
                    </p>
                    <div className="bg-white rounded-2xl border border-industrial-100 overflow-hidden">
                        <dl className="divide-y divide-industrial-100">
                            {product.specs.map((s) => (
                                <div
                                    key={s.label}
                                    className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 px-6 py-4"
                                >
                                    <dt className="text-sm font-semibold text-industrial-500 tracking-wide uppercase">
                                        {s.label}
                                    </dt>
                                    <dd className="sm:col-span-2 text-industrial-900 font-medium">
                                        {s.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* Usage */}
            <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 font-montserrat mb-3">
                        Kullanım Alanları
                    </h2>
                    <p className="text-industrial-500 mb-10">
                        Bu ürün aşağıdaki sektör ve uygulamalarda yaygın olarak tercih edilir.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product.usage.map((u) => (
                            <li
                                key={u}
                                className="flex items-start gap-3 p-5 rounded-2xl bg-industrial-50 border border-industrial-100"
                            >
                                <span className="mt-1 w-2 h-2 rounded-full bg-safety flex-shrink-0" />
                                <span className="text-industrial-800 font-medium">{u}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-deep text-white px-4 sm:px-6 lg:px-8 py-14">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold font-montserrat">
                            Bu ürün için fiyat ve stok bilgisi alın
                        </h3>
                        <p className="text-industrial-200 mt-2">
                            Uzman ekibimiz ihtiyacınıza özel teklif hazırlasın.
                        </p>
                    </div>
                    <Link
                        href="/iletisim"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-safety text-white font-semibold rounded-lg hover:bg-safety-dark transition-colors flex-shrink-0"
                    >
                        Hemen İletişime Geç
                    </Link>
                </div>
            </section>
        </main>
    );
}

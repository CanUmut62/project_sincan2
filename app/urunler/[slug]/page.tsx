import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getCategoryLabel } from "@/lib/categories";
import { getProducts } from "@/lib/products";
import ProductDetailContactButton from "@/components/ProductDetailContactButton";
import { getSiteUrl } from "@/lib/site";

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export async function generateStaticParams(): Promise<Params[]> {
    const products = await getProducts();
    return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = (await getProducts()).find((p) => p.slug === slug);
    if (!product) {
        return { title: "Ürün bulunamadı" };
    }
    return {
        title: product.seoTitle || `${product.title} | Sincan Sac Profil Demir Çelik Ltd. Şti.`,
        description: product.seoDescription || product.longDescription.slice(0, 160),
        alternates: {
            canonical: `${getSiteUrl()}/urunler/${product.slug}`,
        },
    };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const allProducts = await getProducts();
    const product = allProducts.find((p) => p.slug === slug);
    if (!product) notFound();

    const categories = await getCategories();
    const categoryLabel = categories.find((c) => c.key === product.category)?.label ?? product.badge;
    const relatedProducts = allProducts.filter((p) => p.category === product.category && p.slug !== product.slug);

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
                        {product.description ? (
                            <p className="text-industrial-600 text-lg leading-relaxed mb-8">{product.description}</p>
                        ) : null}
                        <div className="flex flex-wrap gap-3">
                            <ProductDetailContactButton />
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

            {/* Açıklama */}
            {product.longDescription.trim() ? (
                <section className="bg-industrial-50 px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 font-montserrat mb-3">
                            Açıklama
                        </h2>
                        <p className="text-industrial-500 mb-10">Ürün hakkında detaylı bilgi.</p>
                        <div className="bg-white rounded-2xl border border-industrial-100 px-6 sm:px-10 py-8 sm:py-10">
                            <p className="text-industrial-700 text-lg leading-relaxed whitespace-pre-line">
                                {product.longDescription}
                            </p>
                        </div>
                    </div>
                </section>
            ) : null}

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

            {relatedProducts.length > 0 ? (
                <section className="bg-industrial-50 px-4 sm:px-6 lg:px-8 py-16 lg:py-20 border-t border-industrial-100">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 font-montserrat mb-3">
                            İlgili Ürünlerimiz
                        </h2>
                        <p className="text-industrial-500 mb-10 max-w-2xl">
                            Aynı kategorideki diğer ürünlerimize göz atın.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedProducts.map((p) => {
                                const badge = p.badge.trim() || getCategoryLabel(p.category, categories);
                                return (
                                    <article
                                        key={p.slug}
                                        className="bg-white rounded-2xl overflow-hidden border border-industrial-100 group flex flex-col"
                                    >
                                        <Link href={`/urunler/${p.slug}`} className="relative h-52 overflow-hidden block">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={p.image}
                                                alt={p.alt}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {badge ? (
                                                <span className="absolute top-4 left-4 px-3 py-1 bg-safety text-white text-xs font-semibold rounded-full">
                                                    {badge}
                                                </span>
                                            ) : null}
                                        </Link>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-xl font-bold text-industrial-900 mb-2 font-montserrat">
                                                <Link
                                                    href={`/urunler/${p.slug}`}
                                                    className="hover:text-safety transition-colors"
                                                >
                                                    {p.title}
                                                </Link>
                                            </h3>
                                            {p.description ? (
                                                <p className="text-industrial-500 text-sm mb-4 line-clamp-3">{p.description}</p>
                                            ) : null}
                                            <Link
                                                href={`/urunler/${p.slug}`}
                                                className="mt-auto inline-flex items-center gap-2 text-safety font-semibold text-sm group/cta"
                                            >
                                                Detaylı Bilgi
                                                <svg
                                                    className="w-4 h-4 transition-transform group-hover/cta:translate-x-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            ) : null}

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

import type { Category } from "@/lib/category-schema";
import Link from "next/link";

type Props = {
    categories: Category[];
};

export default function CategoryCards({ categories }: Props) {
    if (!categories.length) {
        return null;
    }

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-white">
            <div className="max-w-[100rem] mx-auto w-full">
                <div className="text-center mb-14">
                    <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                        Ürün Kategorilerimiz
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 mb-6 font-montserrat">
                        Geniş Çelik Ürün Yelpazesi
                    </h2>
                    <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
                        Boru, profil, sac ve hadde ürünlerinde stoktan teslimat imkanı sunuyoruz.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.key}
                            href={cat.linkHref || "/urunler"}
                            className="group relative rounded-2xl overflow-hidden bg-industrial-100 aspect-[4/5] block w-full max-w-lg sm:max-w-none sm:w-72 lg:w-80 shrink-0 mx-auto sm:mx-0"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={cat.image}
                                alt={cat.label}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/95 via-industrial-900/40 to-transparent" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                <span className="text-xs font-semibold tracking-widest uppercase text-safety mb-2">
                                    {cat.short}
                                </span>
                                <h3 className="text-2xl font-bold font-montserrat mb-2">{cat.label}</h3>
                                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
                                    <div className="min-h-0 overflow-hidden">
                                        <p className="text-sm text-industrial-200 leading-relaxed mb-4 pt-1 opacity-100 translate-y-0 md:opacity-0 md:translate-y-1 transition duration-500 ease-out md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0">
                                            {cat.description}
                                        </p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-safety group-hover:translate-x-1 transition-transform">
                                    Ürünleri Gör
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

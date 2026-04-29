"use client";

import Link from "next/link";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { categories, type Product, type ProductCategory } from "@/lib/products-schema";

type Filter = "all" | ProductCategory;
type ProductGridProps = {
    products: Product[];
};

const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "Tümü" },
    ...categories.map((c) => ({ key: c.key, label: c.label })),
];

export default function ProductGrid({ products }: ProductGridProps) {
    const [active, setActive] = useState<Filter>("all");
    const visible = products.filter((p) => active === "all" || p.category === active);
    useScrollReveal([active, visible.length]);

    return (
        <section id="urunler" className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-industrial-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                        Ürünlerimiz
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 mb-6 font-montserrat">
                        Geniş Çelik Ürün Yelpazesi
                    </h2>
                    <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
                        Sanayi boruları, profiller, sac levhalar ve hadde ürünleri stoklarımızda hazır.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => setActive(f.key)}
                            className={`filter-btn px-6 py-2.5 rounded-full text-sm font-semibold border-2 border-industrial-200 transition-all ${active === f.key
                                ? "active bg-safety border-safety text-white"
                                : "bg-white text-industrial-700 hover:border-safety hover:text-safety"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visible.map((p) => (
                        <article
                            key={`${active}-${p.slug}`}
                            className="product-card scroll-reveal bg-white rounded-2xl overflow-hidden border border-industrial-100 group flex flex-col"
                            style={p.delay ? { transitionDelay: p.delay } : undefined}
                        >
                            <Link href={`/urunler/${p.slug}`} className="relative h-60 overflow-hidden block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={p.image}
                                    alt={p.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="absolute top-4 left-4 px-3 py-1 bg-safety text-white text-xs font-semibold rounded-full">
                                    {p.badge}
                                </span>
                            </Link>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-industrial-900 mb-2 font-montserrat">
                                    <Link href={`/urunler/${p.slug}`} className="hover:text-safety transition-colors">
                                        {p.title}
                                    </Link>
                                </h3>
                                <p className="text-industrial-500 text-sm mb-4">{p.description}</p>
                                <ul className="space-y-2 mb-6">
                                    {p.bullets.map((b, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-industrial-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-safety" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
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
                    ))}
                </div>
            </div>
        </section>
    );
}

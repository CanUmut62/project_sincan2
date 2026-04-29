"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultHeroSlides, type HeroSlide } from "@/lib/hero-slides-schema";

type HeroSliderProps = {
    slides?: HeroSlide[];
};

export default function HeroSlider({ slides = defaultHeroSlides }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);
    const total = slides.length;

    useEffect(() => {
        const id = setInterval(() => setCurrent((c) => (c + 1) % total), 6000);
        return () => clearInterval(id);
    }, [total]);

    const go = (i: number) => setCurrent(((i % total) + total) % total);
    const next = () => go(current + 1);
    const prev = () => go(current - 1);

    return (
        <section id="anasayfa" className="relative h-screen w-full overflow-hidden bg-industrial-900">
            <div className="relative w-full h-full">
                {slides.map((slide, i) => (
                    <div key={slide.image} className={`hero-slide ${i === current ? "active" : ""}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={slide.image} alt={slide.alt} />
                        <div className="absolute inset-0 gradient-overlay"></div>
                        <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
                            <div className="max-w-4xl">
                                <div className="hero-content hc-d1">
                                    <span className="inline-block px-4 py-2 bg-safety/20 text-safety rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-safety/30">
                                        {slide.badge}
                                    </span>
                                </div>
                                <h1 className="hero-content hc-d2 text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
                                    {slide.titleLine1}
                                    <br />
                                    <span className="text-safety">{slide.titleAccent}</span>
                                </h1>
                                <p className="hero-content hc-d3 text-lg md:text-xl text-industrial-200 max-w-2xl mb-10 leading-relaxed">
                                    {slide.description}
                                </p>
                                <div className="hero-content hc-d4 flex flex-wrap gap-4">
                                    <Link
                                        href={slide.primaryHref}
                                        className="px-8 py-4 bg-safety text-white font-semibold rounded-lg hover:bg-safety-dark transition-all duration-300 hover:shadow-xl hover:shadow-safety/25 flex items-center gap-2 group"
                                    >
                                        {slide.primaryLabel}
                                        <svg
                                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href="/iletisim"
                                        className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white hover:text-industrial-900 transition-all duration-300"
                                    >
                                        İletişime Geç
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={prev}
                aria-label="Önceki slayt"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-safety transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                type="button"
                onClick={next}
                aria-label="Sonraki slayt"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-safety transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Slayt ${i + 1}`}
                        onClick={() => go(i)}
                        className={`indicator h-1.5 rounded-full bg-white/40 ${i === current ? "active" : "w-6"}`}
                    />
                ))}
            </div>

            <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/60 animate-float">
                <span className="text-xs tracking-widest uppercase rotate-90 origin-center translate-y-8">Scroll</span>
            </div>
        </section>
    );
}

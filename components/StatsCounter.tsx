"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

type Stat = {
    target: number;
    suffix: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    delay?: string;
};

const stats: Stat[] = [
    {
        target: 25,
        suffix: "+",
        title: "Yıllık Tecrübe",
        description: "Sektördeki derin bilgi birikimimiz",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
        ),
    },
    {
        target: 5000,
        suffix: "+",
        title: "Başarılı Sevkiyat",
        description: "Her yıl binlerce teslimat",
        delay: "0.1s",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
            />
        ),
    },
    {
        target: 1200,
        suffix: "+",
        title: "Mutlu Müşteri",
        description: "Türkiye geneli iş ortaklarımız",
        delay: "0.2s",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
        ),
    },
    {
        target: 2,
        suffix: "",
        title: "Modern Şube",
        description: "Ostim & Kazan lokasyonları",
        delay: "0.3s",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
        ),
    },
];

function StatCard({ stat }: { stat: Stat }) {
    const { ref, value } = useCounterAnimation(stat.target);
    return (
        <div className="scroll-reveal text-center group" style={stat.delay ? { transitionDelay: stat.delay } : undefined}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-safety/10 text-safety mb-6 group-hover:bg-safety group-hover:text-white transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {stat.icon}
                </svg>
            </div>
            <div className="text-4xl md:text-5xl font-bold font-montserrat mb-2 text-white">
                <span ref={ref} className="counter">
                    {value}
                </span>
                {stat.suffix}
            </div>
            <h3 className="text-lg font-semibold mb-1">{stat.title}</h3>
            <p className="text-sm text-industrial-400">{stat.description}</p>
        </div>
    );
}

export default function StatsCounter() {
    useScrollReveal();
    return (
        <section className="bg-industrial-900 text-white py-20 relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((s) => (
                        <StatCard key={s.title} stat={s} />
                    ))}
                </div>
            </div>
        </section>
    );
}

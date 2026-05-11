import type { Partner } from "@/lib/partners-schema";

type Props = {
    partners: Partner[];
};

/**
 * Şeridi yeterince uzatır (viewport'tan geniş); her segment aynı sıra olduğu için
 * translateX(-100/n) ile dikişsiz döngü kurulur.
 */
function segmentCountFor(partnerCount: number): number {
    const minSlots = 36;
    return Math.max(4, Math.min(32, Math.ceil(minSlots / Math.max(partnerCount, 1))));
}

export default function ClientLogos({ partners }: Props) {
    if (!partners.length) {
        return null;
    }

    const segments = segmentCountFor(partners.length);
    const track = Array.from({ length: segments }, () => partners).flat();
    const shiftPercent = 100 / segments;
    const baseDurationSec = 3;
    const durationSec = Math.round(baseDurationSec * (segments / 2));

    return (
        <section className="bg-white border-y border-industrial-100 py-14 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
                <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-3 block">Referanslar</span>
                <h2 className="text-3xl md:text-4xl font-bold text-industrial-900 font-montserrat">Güven Duyan İş Ortakları</h2>
                <p className="mt-3 text-industrial-500 max-w-xl mx-auto">
                    Türkiye&apos;nin farklı sektörlerindeki firmalar uzun süredir bizimle çalışmaktadır.
                </p>
            </div>

            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />
                <div className="overflow-hidden">
                    <div className="partners-marquee flex items-center gap-10 sm:gap-14 md:gap-16 w-max py-2">
                        {track.map((p, i) => (
                            <div
                                key={`${p.id}-${i}`}
                                className="flex-shrink-0 flex items-center justify-center min-w-[120px]"
                                title={p.name}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={p.logoUrl}
                                    alt={p.name}
                                    className="h-12 sm:h-14 md:h-16 w-auto max-w-[160px] object-contain"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes partners-marquee-loop {
                    from { transform: translate3d(0, 0, 0); }
                    to   { transform: translate3d(-${shiftPercent}%, 0, 0); }
                }
                .partners-marquee {
                    animation: partners-marquee-loop ${durationSec}s linear infinite;
                    will-change: transform;
                }
                .partners-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}

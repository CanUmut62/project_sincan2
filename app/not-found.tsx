import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sayfa Bulunamadı | Sincan Sac Profil",
    robots: { index: false },
};

export default function NotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-lg text-center">
                <p className="text-safety font-semibold text-sm tracking-widest uppercase mb-4">404</p>
                <h1 className="text-5xl md:text-6xl font-bold text-industrial-900 font-montserrat mb-4">
                    Sayfa Bulunamadı
                </h1>
                <p className="text-industrial-500 text-lg mb-10">
                    Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-safety text-white font-semibold rounded-lg hover:bg-safety-dark transition-colors"
                    >
                        Ana Sayfaya Dön
                    </Link>
                    <Link
                        href="/urunler"
                        className="px-6 py-3 bg-white text-industrial-800 font-semibold rounded-lg border border-industrial-200 hover:border-safety hover:text-safety transition-colors"
                    >
                        Ürünleri İncele
                    </Link>
                </div>
            </div>
        </main>
    );
}

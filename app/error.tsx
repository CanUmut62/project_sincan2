"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-lg text-center">
                <p className="text-safety font-semibold text-sm tracking-widest uppercase mb-4">Hata</p>
                <h1 className="text-4xl md:text-5xl font-bold text-industrial-900 font-montserrat mb-4">
                    Bir Sorun Oluştu
                </h1>
                <p className="text-industrial-500 text-lg mb-10">
                    Sayfa yüklenirken beklenmeyen bir hata meydana geldi.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        type="button"
                        onClick={reset}
                        className="px-6 py-3 bg-safety text-white font-semibold rounded-lg hover:bg-safety-dark transition-colors"
                    >
                        Tekrar Dene
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-white text-industrial-800 font-semibold rounded-lg border border-industrial-200 hover:border-safety hover:text-safety transition-colors"
                    >
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        </main>
    );
}

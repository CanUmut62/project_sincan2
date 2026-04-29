"use client";

import { useState } from "react";
import ContactModal from "@/components/ContactModal";

export default function ProductDetailContactButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-safety text-white font-semibold rounded-lg hover:bg-safety-dark transition-colors"
            >
                Teklif Al
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
            <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

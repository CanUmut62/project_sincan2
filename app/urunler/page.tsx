import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = {
    title: "Ürünlerimiz | Sincan Sac Profil Demir Çelik Ltd. Şti.",
    description:
        "Sanayi boruları, kare/dikdörtgen profiller, DKP-HR sac, NPU/NPI hadde ürünleri, paslanmaz ve galvaniz çelik ürünleri.",
};

export default function UrunlerPage() {
    return (
        <main className="pt-24">
            <ProductGrid />
        </main>
    );
}

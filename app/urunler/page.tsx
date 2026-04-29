import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
    title: "Ürünlerimiz | Sincan Sac Profil Demir Çelik Ltd. Şti.",
    description:
        "Sanayi boruları, kare/dikdörtgen profiller, DKP-HR sac, NPU/NPI hadde ürünleri, paslanmaz ve galvaniz çelik ürünleri.",
};

export default async function UrunlerPage() {
    const products = await getProducts();

    return (
        <main className="pt-24">
            <ProductGrid products={products} />
        </main>
    );
}

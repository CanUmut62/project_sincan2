import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getCategories } from "@/lib/categories";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
    title: "Ürünlerimiz | Sincan Sac Profil Demir Çelik Ltd. Şti.",
    description:
        "Sanayi boruları, kare/dikdörtgen profiller, DKP-HR sac, NPU/NPI hadde ürünleri, paslanmaz ve galvaniz çelik ürünleri.",
};

export default async function UrunlerPage() {
    const products = await getProducts();
    const categories = await getCategories();

    return (
        <main className="pt-24">
            <ProductGrid products={products} categories={categories} />
        </main>
    );
}

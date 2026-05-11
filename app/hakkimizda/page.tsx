import type { Metadata } from "next";
import FeatureCards from "@/components/FeatureCards";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
    title: "Hakkımızda | Sincan Sac Profil Demir Çelik Ltd. Şti.",
    description:
        "Sincan Sac Profil: Ankara Sincan'da sanayi ve yapı sektörüne sac, profil ve çelik tedarikinde güçlü altyapı, hızlı sevkiyat ve müşteri odaklı hizmet.",
};

export default function HakkimizdaPage() {
    return (
        <main className="pt-24">
            <AboutContent />
            <FeatureCards />
        </main>
    );
}

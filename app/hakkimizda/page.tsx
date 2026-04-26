import type { Metadata } from "next";
import FeatureCards from "@/components/FeatureCards";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
    title: "Hakkımızda | Sincan Sac Profil Demir Çelik Ltd. Şti.",
    description:
        "1998'den beri Ankara Ostim'de demir çelik sektöründe faaliyet gösteren Sincan Sac Profil Demir Çelik Ltd. Şti. hakkında detaylı bilgi.",
};

export default function HakkimizdaPage() {
    return (
        <main className="pt-24">
            <AboutContent />
            <FeatureCards />
        </main>
    );
}

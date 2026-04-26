import type { Metadata } from "next";
import ContactInfo from "@/components/ContactInfo";

export const metadata: Metadata = {
    title: "İletişim | Sincan Sac Profil Demir Çelik Ltd. Şti.",
    description:
        "Sincan Sac Profil Demir Çelik Ltd. Şti. iletişim bilgileri: telefon numaraları, e-posta, adres ve harita.",
};

export default function IletisimPage() {
    return (
        <main className="pt-24">
            <ContactInfo />
        </main>
    );
}

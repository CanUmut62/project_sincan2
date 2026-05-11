import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { getSiteUrl } from "@/lib/site";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    metadataBase: new URL(getSiteUrl()),
    title: {
        default: "Sincan Sac Profil Demir Çelik Ltd. Şti. | Demir Çelik ve Metal Sanayi",
        template: "%s | Sincan Sac Profil",
    },
    description:
        "25 yılı aşkın tecrübemizle Türkiye'nin dört bir yanına kaliteli demir çelik ürünleri sunuyoruz. Boru, profil, sac ve hadde ürünleri.",
    alternates: { canonical: getSiteUrl() },
    openGraph: {
        type: "website",
        locale: "tr_TR",
        siteName: "Sincan Sac Profil Demir Çelik Ltd. Şti.",
        title: "Sincan Sac Profil Demir Çelik Ltd. Şti. | Demir Çelik ve Metal Sanayi",
        description:
            "25 yılı aşkın tecrübemizle Türkiye'nin dört bir yanına kaliteli demir çelik ürünleri sunuyoruz.",
        url: getSiteUrl(),
    },
    twitter: {
        card: "summary_large_image",
        title: "Sincan Sac Profil Demir Çelik Ltd. Şti.",
        description:
            "25 yılı aşkın tecrübemizle Türkiye'nin dört bir yanına kaliteli demir çelik ürünleri sunuyoruz.",
    },
    robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const headerStore = await headers();
    const isAdminLayout = headerStore.get("x-admin-layout") === "1";

    return (
        <html lang="tr" className={`${inter.variable} ${montserrat.variable}`}>
            <body className="bg-industrial-50 text-industrial-800 antialiased">
                {!isAdminLayout ? <Navbar /> : null}
                {children}
                {!isAdminLayout ? <FloatingButtons /> : null}
                {!isAdminLayout ? <Footer /> : null}
            </body>
        </html>
    );
}


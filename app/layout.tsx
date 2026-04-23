import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata: Metadata = {
    title: "Yakup Yılmaz Boru Profil A.Ş. | Demir Çelik ve Metal Sanayi",
    description:
        "25 yılı aşkın tecrübemizle Türkiye'nin dört bir yanına kaliteli demir çelik ürünleri sunuyoruz. Boru, profil, sac ve hadde ürünleri.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-industrial-50 text-industrial-800 antialiased">
                <Navbar />
                {children}
                <FloatingButtons />
                <Footer />
            </body>
        </html>
    );
}

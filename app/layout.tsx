import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata: Metadata = {
    title: "Sincan Sac Profil Demir Çelik Ltd. Şti. | Demir Çelik ve Metal Sanayi",
    description:
        "25 yılı aşkın tecrübemizle Türkiye'nin dört bir yanına kaliteli demir çelik ürünleri sunuyoruz. Boru, profil, sac ve hadde ürünleri.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const headerStore = await headers();
    const isAdminLayout = headerStore.get("x-admin-layout") === "1";

    return (
        <html lang="tr">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-industrial-50 text-industrial-800 antialiased">
                {!isAdminLayout ? <Navbar /> : null}
                {children}
                {!isAdminLayout ? <FloatingButtons /> : null}
                {!isAdminLayout ? <Footer /> : null}
            </body>
        </html>
    );
}

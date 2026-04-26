import Link from "next/link";
import { contactInfo, contactPersons } from "@/lib/contact";

const corporateLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/urunler", label: "Ürünler" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/iletisim", label: "İletişim" },
];

const productLinks = [
    { href: "/urunler/sanayi-borulari", label: "Sanayi Boruları" },
    { href: "/urunler/kare-dikdortgen-profiller", label: "Kare / Dikdörtgen Profil" },
    { href: "/urunler/dkp-hr-sac", label: "DKP & HR Sac" },
    { href: "/urunler/npu-npi-profiller", label: "NPU / NPI Profiller" },
    { href: "/urunler/paslanmaz-borular", label: "Paslanmaz Borular" },
    { href: "/urunler/galvaniz-profiller", label: "Galvaniz Profiller" },
];

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-industrial-900 text-industrial-200 pt-16 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 bg-safety rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl font-montserrat">SSP</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold font-montserrat leading-tight">SİNCAN SAC PROFİL</h3>
                                <p className="text-xs tracking-widest text-industrial-400">DEMİR ÇELİK LTD. ŞTİ.</p>
                            </div>
                        </div>
                        <p className="text-sm text-industrial-400 leading-relaxed">
                            1998'den bu yana Ankara Ostim'de demir çelik sektörünün güvenilir tedarikçisi.
                        </p>
                    </div>

                    {/* Kurumsal */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 font-montserrat tracking-wide uppercase text-sm">
                            Kurumsal
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {corporateLinks.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="hover:text-safety transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ürünler */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 font-montserrat tracking-wide uppercase text-sm">
                            Ürünler
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {productLinks.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="hover:text-safety transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* İletişim */}
                    <div>
                        <h4 className="text-white font-semibold mb-5 font-montserrat tracking-wide uppercase text-sm">
                            İletişim
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {contactPersons.map((p) => (
                                <li key={p.tel}>
                                    <a href={`tel:${p.tel}`} className="hover:text-safety transition-colors">
                                        <span className="block font-semibold text-white">{p.display}</span>
                                        <span className="text-xs text-industrial-400">
                                            {p.name} · {p.role}
                                        </span>
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-safety transition-colors break-all">
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li className="text-industrial-400 leading-relaxed">{contactInfo.addressFull}</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-industrial-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-industrial-500">
                    <p>© {year} Sincan Sac Profil Demir Çelik Ltd. Şti. Tüm hakları saklıdır.</p>
                    <p>{contactInfo.workingHours}</p>
                </div>
            </div>
        </footer>
    );
}

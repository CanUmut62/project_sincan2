"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/nav";
import ContactModal from "@/components/ContactModal";

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);

    useEffect(() => {
        if (!isHome) {
            setScrolled(false);
            return;
        }
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    // Anasayfa dışındaki tüm sayfalarda navbar daima opak/solid.
    const solid = !isHome || scrolled;

    const headerClasses = `fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${solid ? "glass-nav bg-white py-3" : "glass-nav-transparent py-6"
        }`;
    const titleClasses = `font-bold text-lg leading-tight font-montserrat transition-colors ${solid ? "text-industrial-900" : "text-white"
        }`;
    const subClasses = `text-xs tracking-widest transition-colors ${solid ? "text-industrial-500" : "text-industrial-300"
        }`;
    const navLinkClasses = (active: boolean) =>
        `nav-link text-sm font-medium transition-colors hover:text-safety ${active
            ? "text-safety"
            : solid
                ? "text-industrial-700"
                : "text-white/90"
        }`;
    const mobileBtnClasses = `lg:hidden p-2 rounded-lg transition-colors ${solid ? "text-industrial-900" : "text-white"
        }`;

    return (
        <header className={headerClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-deep rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-safety transition-colors duration-300">
                            <span className="text-white font-bold text-xl font-montserrat">SSP</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className={titleClasses}>SİNCAN SAC PROFİL</h1>
                            <p className={subClasses}>DEMİR ÇELİK LTD. ŞTİ.</p>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => {
                            const active =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname?.startsWith(item.href) ?? false;
                            return (
                                <Link key={item.href} href={item.href} className={navLinkClasses(!!active)}>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => setContactModalOpen(true)}
                            className="px-6 py-2.5 bg-safety text-white font-semibold rounded-lg hover:bg-safety-dark transition-all duration-300 text-sm"
                        >
                            Teklif Al
                        </button>
                    </div>

                    <button
                        type="button"
                        aria-label="Menüyü aç/kapat"
                        onClick={() => setMobileOpen((v) => !v)}
                        className={mobileBtnClasses}
                    >
                        {mobileOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div className={`mobile-menu lg:hidden mt-2 bg-white ${mobileOpen ? "open" : ""}`}>
                <div className="px-4 py-6 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-lg font-medium text-industrial-800 hover:text-safety"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-industrial-100">
                        <button
                            type="button"
                            onClick={() => {
                                setMobileOpen(false);
                                setContactModalOpen(true);
                            }}
                            className="block w-full text-center px-6 py-3 bg-safety text-white font-semibold rounded-lg hover:bg-safety-dark transition-colors"
                        >
                            Teklif Al
                        </button>
                    </div>
                </div>
            </div>
            <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
        </header>
    );
}

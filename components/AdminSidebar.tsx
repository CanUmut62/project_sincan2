"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { href: "/admin/hero", label: "Hero Yönetimi" },
    { href: "/admin/urunler", label: "Ürün Yönetimi" },
    { href: "/admin/iletisim", label: "İletişim Yönetimi" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-industrial-100 p-4">
                <p className="text-xs font-semibold tracking-widest uppercase text-safety mb-3">Admin Menü</p>
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                    active
                                        ? "bg-safety text-white"
                                        : "text-industrial-700 hover:bg-industrial-100"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}

import type { ReactNode } from "react";
import type { Metadata } from "next";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import AdminSidebar from "@/components/AdminSidebar";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen bg-industrial-50 pt-28 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl border border-industrial-100 p-6 md:p-8 flex items-start justify-between gap-4 mb-6">
                    <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-safety mb-2">Admin Panel</p>
                        <h1 className="text-3xl font-bold text-industrial-900 font-montserrat">Yönetim Alanı</h1>
                        <p className="text-industrial-500 mt-2">Sol menüden modül seçip düzenleme yapabilirsin.</p>
                    </div>
                    <AdminLogoutButton />
                </div>

                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <AdminSidebar />
                    <div className="flex-1 w-full">{children}</div>
                </div>
            </div>
        </main>
    );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactInfo from "@/components/ContactInfo";
import { getContactSettings } from "@/lib/contact";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const settings = await getContactSettings();
    if (slug !== settings.pageSeo.slug || slug === "iletisim") {
        return {};
    }
    return {
        title: settings.pageSeo.title,
        description: settings.pageSeo.description,
    };
}

export default async function ContactSlugPage({ params }: PageProps) {
    const { slug } = await params;
    const settings = await getContactSettings();

    if (slug !== settings.pageSeo.slug || slug === "iletisim") {
        notFound();
    }

    return (
        <main className="pt-24">
            <ContactInfo contactInfo={settings.contactInfo} contactPersons={settings.contactPersons} />
        </main>
    );
}

import type { ContactInfo as ContactInfoType, ContactPerson } from "@/lib/contact-schema";

type ContactInfoProps = {
    contactInfo: ContactInfoType;
    contactPersons: ContactPerson[];
};

export default function ContactInfo({ contactInfo, contactPersons }: ContactInfoProps) {
    return (
        <section id="iletisim" className="relative py-24 overflow-hidden bg-industrial-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
                        İletişim
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-industrial-900 mb-6 font-montserrat">
                        Bize Ulaşın
                    </h1>
                    <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
                        Demir çelik ihtiyaçlarınız için aşağıdaki kanallardan bize kolayca ulaşabilirsiniz.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* İletişim Bilgileri */}
                    <div className="bg-white rounded-3xl border border-industrial-100 p-8 lg:p-10 space-y-8">
                        {/* Telefonlar */}
                        <div>
                            <h2 className="text-xs font-semibold tracking-widest uppercase text-safety mb-4">
                                Telefon
                            </h2>
                            <div className="space-y-4">
                                {contactPersons.map((p) => (
                                    <a
                                        key={p.tel}
                                        href={`tel:${p.tel}`}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-industrial-50 hover:bg-industrial-100 transition-colors group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-safety/10 text-safety flex items-center justify-center flex-shrink-0 group-hover:bg-safety group-hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-lg font-bold text-industrial-900">{p.display}</p>
                                            <p className="text-sm text-industrial-500">
                                                {p.name} · {p.role}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* E-posta */}
                        <div>
                            <h2 className="text-xs font-semibold tracking-widest uppercase text-safety mb-4">
                                E-posta
                            </h2>
                            <a
                                href={`mailto:${contactInfo.email}`}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-industrial-50 hover:bg-industrial-100 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-safety/10 text-safety flex items-center justify-center flex-shrink-0 group-hover:bg-safety group-hover:text-white transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-lg font-semibold text-industrial-900 break-all">
                                    {contactInfo.email}
                                </span>
                            </a>
                        </div>

                        {/* Adres */}
                        <div>
                            <h2 className="text-xs font-semibold tracking-widest uppercase text-safety mb-4">
                                Adres
                            </h2>
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-industrial-50">
                                <div className="w-12 h-12 rounded-full bg-safety/10 text-safety flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-lg font-semibold text-industrial-900 leading-snug">
                                        {contactInfo.addressFull}
                                    </p>
                                    <p className="text-sm text-industrial-500 mt-1">{contactInfo.workingHours}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Harita */}
                    <div className="rounded-3xl overflow-hidden border border-industrial-100 bg-white min-h-[500px] flex">
                        <iframe
                            title="Konum Haritası"
                            src={contactInfo.mapEmbedSrc}
                            className="w-full h-full min-h-[500px]"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

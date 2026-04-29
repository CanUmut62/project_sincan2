export type ContactPerson = {
    name: string;
    role: string;
    display: string;
    tel: string;
    whatsapp: string;
};

export type ContactInfo = {
    email: string;
    addressShort: string;
    addressFull: string;
    workingHours: string;
    mapEmbedSrc: string;
};

export type ContactSettings = {
    contactPersons: ContactPerson[];
    contactInfo: ContactInfo;
    pageSeo: {
        slug: string;
        title: string;
        description: string;
    };
};

export const defaultContactSettings: ContactSettings = {
    contactPersons: [
        {
            name: "Sincan Sac Profil",
            role: "Genel Müdür",
            display: "0312 315 00 01",
            tel: "+903123150001",
            whatsapp: "903123150001",
        },
        {
            name: "Mehmet Yılmaz",
            role: "Satış Sorumlusu",
            display: "0312 315 00 02",
            tel: "+903123150002",
            whatsapp: "903123150002",
        },
    ],
    contactInfo: {
        email: "info@sincansacprofil.com",
        addressShort: "Ostim OSB, Ankara",
        addressFull: "Ostim OSB, 1234. Cad. No:56 Yenimahalle / Ankara",
        workingHours: "Hafta İçi: 08:00 - 18:00",
        mapEmbedSrc: "https://www.google.com/maps?q=Ostim+OSB+Ankara&output=embed",
    },
    pageSeo: {
        slug: "iletisim",
        title: "İletişim | Sincan Sac Profil Demir Çelik Ltd. Şti.",
        description: "Sincan Sac Profil iletişim bilgileri: telefon, e-posta, adres ve harita bilgileri.",
    },
};

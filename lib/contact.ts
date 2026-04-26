export type ContactPerson = {
  name: string;
  role: string;
  /** Görüntülenen biçim, örn. "0312 315 00 01" */
  display: string;
  /** tel:/wa.me link'i için E.164 yakın biçim, örn. "+903123150001" */
  tel: string;
  /** Sadece rakamlar, "+" hariç — wa.me linki için, örn. "903123150001" */
  whatsapp: string;
};

export const contactPersons: ContactPerson[] = [
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
];

export const contactInfo = {
  email: "info@sincansacprofil.com",
  addressShort: "Ostim OSB, Ankara",
  addressFull: "Ostim OSB, 1234. Cad. No:56 Yenimahalle / Ankara",
  workingHours: "Hafta İçi: 08:00 - 18:00",
  /** Google Maps embed src (Ostim OSB, Ankara genel konumu) */
  mapEmbedSrc:
    "https://www.google.com/maps?q=Ostim+OSB+Ankara&output=embed",
};

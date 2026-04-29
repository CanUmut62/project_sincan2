export type HeroSlide = {
    image: string;
    alt: string;
    badge: string;
    titleLine1: string;
    titleAccent: string;
    description: string;
    primaryHref: string;
    primaryLabel: string;
};

export const defaultHeroSlides: HeroSlide[] = [
    {
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1920&q=80",
        alt: "Endüstriyel Çelik Depo",
        badge: "Sincan Sac Profil Demir Çelik Ltd. Şti.",
        titleLine1: "Endüstriyel Gücün",
        titleAccent: "Güvenilir Adresi",
        description: "25 yılı aşkın tecrübemizle Türkiye'nin dört bir yanına kaliteli demir çelik ürünleri sunuyoruz.",
        primaryHref: "/urunler",
        primaryLabel: "Ürünleri Keşfet",
    },
    {
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80",
        alt: "CNC Lazer Kesim",
        badge: "Sincan Sac Profil Demir Çelik Ltd. Şti.",
        titleLine1: "CNC Lazer Kesim",
        titleAccent: "Teknolojisi",
        description: "Paslanmaz çelik, alüminyum ve sac metal malzemelerde hassas kesim çözümleri.",
        primaryHref: "/urunler",
        primaryLabel: "Detaylı Bilgi",
    },
    {
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
        alt: "Hızlı Sevkiyat",
        badge: "Sincan Sac Profil Demir Çelik Ltd. Şti.",
        titleLine1: "Hızlı Sevkiyat",
        titleAccent: "Uygun Fiyat",
        description: "Ostim ve Kazan şubelerimizle stoktan teslimat, rekabetçi fiyat politikası.",
        primaryHref: "/iletisim",
        primaryLabel: "Teklif Al",
    },
];

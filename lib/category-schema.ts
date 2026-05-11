export type Category = {
    /** URL ve ürün eşlemesi için benzersiz anahtar (örn. borular) */
    key: string;
    label: string;
    short: string;
    description: string;
    image: string;
    /** Kart tıklanınca gidilecek adres; boş bırakılırsa /urunler */
    linkHref: string;
};

/** data/categories.json yoksa veya bozuksa kullanılan başlangıç listesi */
export const seedCategories: Category[] = [
    {
        key: "borular",
        label: "Borular",
        short: "Sanayi & Paslanmaz",
        description:
            "Doğalgaz, su, yapısal ve gıda uygulamaları için siyah, galvaniz ve paslanmaz çelik borular.",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
        linkHref: "/urunler",
    },
    {
        key: "profiller",
        label: "Profiller",
        short: "Kare, Dikdörtgen, Galvaniz",
        description: "Makina sanayi, inşaat ve dış cephe için kare/dikdörtgen kesit ve galvaniz kaplı profiller.",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
        linkHref: "/urunler",
    },
    {
        key: "saclar",
        label: "Saclar",
        short: "DKP & HR",
        description: "Soğuk haddelenmiş (DKP) ve sıcak haddelenmiş (HR) sac levhalar, rulo ve kesilmiş ölçülerde.",
        image: "https://images.unsplash.com/photo-1535191030489-d98db0243e1a?w=800&q=80",
        linkHref: "/urunler",
    },
    {
        key: "hadde",
        label: "Hadde Ürünleri",
        short: "NPU / NPI / HEA",
        description: "Standart ve özel kesitli hadde profilleri, lama ve köşebent çeşitleri.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        linkHref: "/urunler",
    },
];

export type ProductCategory = "borular" | "profiller" | "saclar" | "hadde";

export type ProductSpec = {
    label: string;
    value: string;
};

export const CATEGORY_PREFIXES: Record<ProductCategory, string> = {
    borular: "BOR",
    profiller: "PRF",
    saclar: "SAC",
    hadde: "HAD",
};

export type Product = {
    slug: string;
    refCode?: string;
    seoTitle?: string;
    seoDescription?: string;
    category: ProductCategory;
    badge: string;
    image: string;
    alt: string;
    title: string;
    description: string;
    bullets: string[];
    longDescription: string;
    specs: ProductSpec[];
    usage: string[];
    delay?: string;
};

export type CategoryInfo = {
    key: ProductCategory;
    label: string;
    short: string;
    description: string;
    image: string;
};

export const categories: CategoryInfo[] = [
    {
        key: "borular",
        label: "Borular",
        short: "Sanayi & Paslanmaz",
        description: "Doğalgaz, su, yapısal ve gıda uygulamaları için siyah, galvaniz ve paslanmaz çelik borular.",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
    },
    {
        key: "profiller",
        label: "Profiller",
        short: "Kare, Dikdörtgen, Galvaniz",
        description: "Makina sanayi, inşaat ve dış cephe için kare/dikdörtgen kesit ve galvaniz kaplı profiller.",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    },
    {
        key: "saclar",
        label: "Saclar",
        short: "DKP & HR",
        description: "Soğuk haddelenmiş (DKP) ve sıcak haddelenmiş (HR) sac levhalar, rulo ve kesilmiş ölçülerde.",
        image: "https://images.unsplash.com/photo-1535191030489-d98db0243e1a?w=800&q=80",
    },
    {
        key: "hadde",
        label: "Hadde Ürünleri",
        short: "NPU / NPI / HEA",
        description: "Standart ve özel kesitli hadde profilleri, lama ve köşebent çeşitleri.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    },
];

export const defaultProducts: Product[] = [
    {
        slug: "sanayi-borulari",
        seoTitle: "Sanayi Boruları | Sincan Sac Profil",
        seoDescription: "Sanayi boruları ürün detayları: çap aralığı, et kalınlığı, kalite sınıfları ve kullanım alanları.",
        category: "borular",
        badge: "Borular",
        image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80",
        alt: "Sanayi Boruları",
        title: "Sanayi Boruları",
        description: "Doğalgaz, su ve yapısal uygulamalar için çelik borular",
        bullets: ["DN15 - DN200", "Siyah / Galvaniz", "St37 / St52"],
        longDescription: "Sanayi boruları; doğalgaz tesisatı, su iletimi, sulama hatları, ısıtma sistemleri ve yapısal konstrüksiyon uygulamalarında tercih edilen, dikişli ve dikişsiz olarak üretilen çelik borulardır. Stoklarımızda siyah ve galvaniz kaplı seçenekler mevcuttur.",
        specs: [
            { label: "Çap Aralığı", value: "DN15 - DN200" },
            { label: "Et Kalınlığı", value: "1.5 mm - 8 mm" },
            { label: "Standart Boy", value: "6 m / 12 m" },
            { label: "Malzeme Kalitesi", value: "St37 / St52 / S235JR" },
            { label: "Yüzey", value: "Siyah / Sıcak Daldırma Galvaniz" },
            { label: "Üretim Standardı", value: "EN 10219 / EN 10255" },
        ],
        usage: ["Doğalgaz ve su tesisatı", "Yangın söndürme hatları", "Sulama ve drenaj sistemleri", "Yapısal konstrüksiyon", "Endüstriyel tesisat hatları"],
    },
    {
        slug: "kare-dikdortgen-profiller",
        seoTitle: "Kare ve Dikdörtgen Profiller | Sincan Sac Profil",
        seoDescription: "Kare ve dikdörtgen çelik profiller için ölçü, kalite ve teknik özellik detaylarını inceleyin.",
        category: "profiller",
        badge: "Profiller",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        alt: "Kare ve Dikdörtgen Profiller",
        title: "Kare ve Dikdörtgen Profiller",
        description: "Makina sanayi ve inşaat sektörü için kesit profiller",
        bullets: ["10x10 - 400x400", "S235JR / S275JR", "6m - 12m Boy"],
        delay: "0.1s",
        longDescription: "Kare ve dikdörtgen kesitli profiller; çelik konstrüksiyon, makina imalatı, mobilya, otomotiv ve tarım sanayinde yaygın olarak kullanılır. Geniş ölçü ve et kalınlığı yelpazesiyle stoktan teslim imkanı sunuyoruz.",
        specs: [
            { label: "Kare Ölçü", value: "10x10 mm - 400x400 mm" },
            { label: "Dikdörtgen Ölçü", value: "20x10 mm - 400x300 mm" },
            { label: "Et Kalınlığı", value: "1 mm - 12 mm" },
            { label: "Standart Boy", value: "6 m / 12 m" },
            { label: "Kalite", value: "S235JR / S275JR / S355JR" },
            { label: "Üretim Standardı", value: "EN 10219" },
        ],
        usage: ["Çelik konstrüksiyon ve çatı sistemleri", "Makina ve şase imalatı", "Mobilya ve raf sistemleri", "Tarım ekipmanları (sera, ahır)", "Korkuluk ve çit uygulamaları"],
    },
];

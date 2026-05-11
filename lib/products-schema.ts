/** Ürünün bağlı olduğu kategori anahtarı (`data/categories.json` ile eşleşir) */
export type ProductCategory = string;

export type Product = {
    slug: string;
    seoTitle?: string;
    seoDescription?: string;
    category: ProductCategory;
    badge: string;
    image: string;
    alt: string;
    title: string;
    /** Liste kartı ve ürün detay üst alanı — kısa özet */
    description: string;
    bullets: string[];
    /** Ürün detay sayfasında "Açıklama" bölümünde gösterilir */
    longDescription: string;
    usage: string[];
    delay?: string;
};

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
        longDescription:
            "Sanayi boruları; doğalgaz tesisatı, su iletimi, sulama hatları, ısıtma sistemleri ve yapısal konstrüksiyon uygulamalarında tercih edilen, dikişli ve dikişsiz olarak üretilen çelik borulardır. Stoklarımızda siyah ve galvaniz kaplı seçenekler mevcuttur.",
        usage: [
            "Doğalgaz ve su tesisatı",
            "Yangın söndürme hatları",
            "Sulama ve drenaj sistemleri",
            "Yapısal konstrüksiyon",
            "Endüstriyel tesisat hatları",
        ],
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
        longDescription:
            "Kare ve dikdörtgen kesitli profiller; çelik konstrüksiyon, makina imalatı, mobilya, otomotiv ve tarım sanayinde yaygın olarak kullanılır. Geniş ölçü ve et kalınlığı yelpazesiyle stoktan teslim imkanı sunuyoruz.",
        usage: [
            "Çelik konstrüksiyon ve çatı sistemleri",
            "Makina ve şase imalatı",
            "Mobilya ve raf sistemleri",
            "Tarım ekipmanları (sera, ahır)",
            "Korkuluk ve çit uygulamaları",
        ],
    },
];

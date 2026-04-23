import { categories } from "@/lib/products";
import Link from "next/link";

export default function CategoryCards() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-safety font-semibold text-sm tracking-widest uppercase mb-4 block">
            Ürün Kategorilerimiz
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-industrial-900 mb-6 font-montserrat">
            Geniş Çelik Ürün Yelpazesi
          </h2>
          <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
            Boru, profil, sac ve hadde ürünlerinde stoktan teslimat imkanı sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href="/urunler"
              className="group relative rounded-2xl overflow-hidden bg-industrial-100 aspect-[4/5] block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900/95 via-industrial-900/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-semibold tracking-widest uppercase text-safety mb-2">
                  {cat.short}
                </span>
                <h3 className="text-2xl font-bold font-montserrat mb-2">{cat.label}</h3>
                <p className="text-sm text-industrial-200 leading-relaxed mb-4">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-safety group-hover:translate-x-1 transition-transform">
                  Ürünleri Gör
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

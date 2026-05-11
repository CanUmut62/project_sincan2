"use client";

import { useEffect, useId, useRef, useState } from "react";
import { defaultContactSettings, type ContactPerson } from "@/lib/contact-schema";

type Mode = "phone" | "whatsapp";

export default function FloatingButtons() {
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>(defaultContactSettings.contactPersons);
  const [mode, setMode] = useState<Mode | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrollArrowGradId = `scroll-arrow-grad-${useId().replace(/[^a-zA-Z0-9_-]/g, "") || "g"}`;

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/contact", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { contactPersons: ContactPerson[] };
      if (Array.isArray(data.contactPersons) && data.contactPersons.length) {
        setContactPersons(data.contactPersons);
      }
    }
    void load();
  }, []);

  // Dış tıklama / Esc ile kapat
  useEffect(() => {
    if (!mode) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setMode(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [mode]);

  const toggle = (next: Mode) => setMode((curr) => (curr === next ? null : next));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 md:right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {mode && (
        <div
          ref={panelRef}
          className="absolute right-16 md:right-20 bottom-0 w-72 bg-white rounded-2xl shadow-2xl border border-industrial-100 overflow-hidden animate-fadeIn"
          role="dialog"
          aria-label={mode === "phone" ? "Telefon numarası seçin" : "WhatsApp numarası seçin"}
        >
          <div
            className={`px-4 py-3 text-white text-sm font-semibold ${mode === "phone" ? "bg-deep" : "bg-[#25D366]"
              }`}
          >
            {mode === "phone" ? "Bizi Arayın" : "WhatsApp ile Yazın"}
          </div>
          <ul className="divide-y divide-industrial-100">
            {contactPersons.map((p) => {
              const href =
                mode === "phone"
                  ? `tel:${p.tel}`
                  : `https://wa.me/${p.whatsapp}`;
              const target = mode === "whatsapp" ? "_blank" : undefined;
              const rel = mode === "whatsapp" ? "noopener noreferrer" : undefined;
              return (
                <li key={p.tel}>
                  <a
                    href={href}
                    target={target}
                    rel={rel}
                    onClick={() => setMode(null)}
                    className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-industrial-50 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-industrial-900 truncate">
                        {p.display}
                      </p>
                      <p className="text-xs text-industrial-500 truncate">
                        {p.name} · {p.role}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${mode === "phone"
                          ? "bg-safety/10 text-safety"
                          : "bg-[#25D366]/10 text-[#128C7E]"
                        }`}
                    >
                      {mode === "phone" ? "Ara" : "Yaz"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        aria-label="Sayfanın başına git"
        onClick={scrollToTop}
        className="p-2 bg-transparent border-0 shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-safety/50 focus-visible:ring-offset-2 rounded-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <span className="floating-scroll-arrow" aria-hidden>
          <svg className="w-8 h-8 md:w-9 md:h-9 overflow-visible" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient
                id={scrollArrowGradId}
                x1="4"
                y1="20"
                x2="20"
                y2="4"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1E3A5F" />
                <stop offset="0.45" stopColor="#FF5733" />
                <stop offset="1" stopColor="#FF5733" />
              </linearGradient>
            </defs>
            <path
              stroke={`url(#${scrollArrowGradId})`}
              strokeWidth={2.35}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </span>
      </button>

      <button
        type="button"
        aria-label="WhatsApp ile iletişim"
        onClick={() => toggle("whatsapp")}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform ${mode === "whatsapp" ? "ring-4 ring-[#25D366]/30" : ""
          }`}
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.094 1.094 0 00-.793.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Telefon ile iletişim"
        onClick={() => toggle("phone")}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-safety text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform ${mode === "phone" ? "ring-4 ring-safety/30" : ""
          }`}
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </button>
    </div>
  );
}

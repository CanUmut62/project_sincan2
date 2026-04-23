"use client";

import { useEffect } from "react";

/**
 * Mounts an IntersectionObserver that adds the `visible` class to any element
 * with the `scroll-reveal` class once it scrolls into view.
 * Pass `deps` to re-run when the observed elements change (ör. filtre sonrası).
 */
export function useScrollReveal(deps: ReadonlyArray<unknown> = []) {
    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: "-50px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll<HTMLElement>(".scroll-reveal");
        elements.forEach((el) => {
            // Filtre sonrası yeni eklenen kartlar için görünürlüğü sıfırla,
            // observer in-view olduklarında tekrar `visible` ekleyecek.
            if (!el.classList.contains("visible")) {
                observer.observe(el);
            } else {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

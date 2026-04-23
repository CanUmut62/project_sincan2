"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a counter from 0 to `target` over 2 seconds when the returned ref
 * scrolls into view. Mirrors the original index.html counter animation.
 */
export function useCounterAnimation(target: number) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        let timer: ReturnType<typeof setInterval> | null = null;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const duration = 2000;
                        const steps = 60;
                        const increment = target / steps;
                        let current = 0;

                        timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                setValue(target);
                                if (timer) clearInterval(timer);
                            } else {
                                setValue(Math.floor(current));
                            }
                        }, duration / steps);

                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
            if (timer) clearInterval(timer);
        };
    }, [target]);

    return { ref, value: value.toLocaleString("tr-TR") };
}

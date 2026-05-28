// src/utils/useReveal.js
import { useEffect } from "react";

/**
 * Bruk: gi elementer data-reveal eller data-reveal-stagger.
 * Hooken legger til klassen 'show' når de kommer i view.
 */
export function useReveal(options = {}) {
  useEffect(() => {
    const selector = "[data-reveal], [data-reveal-stagger]";
    const targets = Array.from(document.querySelectorAll(selector));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            // Unobserve for å ikke trigge igjen (kan fjernes hvis du vil re-spille)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px", // begynn litt før elementet er fullt i view
        threshold: 0.2,
        ...options,
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [options]);
}
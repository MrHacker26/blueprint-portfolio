"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const ratios = new Map<string, number>();

    for (const el of elements) {
      ratios.set(el.id, 0);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let bestId = "";
        let bestRatio = 0;

        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio === 0) {
          const marker = window.innerHeight * 0.28;
          const passed = elements.filter(
            (el) => el.getBoundingClientRect().top <= marker,
          );
          bestId = passed.at(-1)?.id ?? "";
        }

        setActiveId(bestId);
      },
      {
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
        rootMargin: "-18% 0px -52% 0px",
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

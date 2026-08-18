"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const sequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
] as const;

export function KonamiLab() {
  const router = useRouter();

  useEffect(() => {
    let index = 0;

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.closest("input, textarea, [contenteditable='true']") ||
          target.isContentEditable)
      ) {
        return;
      }

      const expected = sequence[index];
      if (event.code === expected) {
        index += 1;
        if (index === sequence.length) {
          index = 0;
          router.push("/lab");
        }
        return;
      }

      index = event.code === sequence[0] ? 1 : 0;
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}

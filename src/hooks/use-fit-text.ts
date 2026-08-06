import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Scales a content block down (never up past 1) until it fits inside its
 * parent box, so the success message never overflows or clips on any device.
 */
export function useFitText<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T | null>(null);
  const [scale, setScale] = useState(1);

  const measure = useCallback(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const availableH = parent.clientHeight;
    const availableW = parent.clientWidth;
    const naturalH = el.scrollHeight / (scale || 1);
    const naturalW = el.scrollWidth / (scale || 1);
    if (!availableH || !naturalH) return;

    const next = Math.min(1, availableH / naturalH, availableW / naturalW);
    const clamped = Math.max(0.62, Math.round(next * 1000) / 1000);
    setScale((prev) => (Math.abs(prev - clamped) > 0.004 ? clamped : prev));
  }, [scale]);

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    if (typeof document !== "undefined" && "fonts" in document) {
      void document.fonts.ready.then(() => measure());
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [measure]);

  return { ref, scale };
}
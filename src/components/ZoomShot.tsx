"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Product screenshots show real buttons, so people click them. A click here
 * opens the screen full size instead of doing nothing: the image the browser
 * already chose (phone or desktop) fills an overlay; a click, the close
 * button or Escape closes it and returns focus to the screenshot.
 */
export default function ZoomShot({ alt, children }: { alt: string; children: ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const closer = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setSrc(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (!src) return;
    closer.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src, close]);

  return (
    <>
      <button
        ref={opener}
        type="button"
        className="sd-zoom"
        aria-label={`View larger: ${alt}`}
        onClick={(e) => {
          const img = e.currentTarget.querySelector("img");
          setSrc(img?.currentSrc || img?.src || null);
        }}
      >
        {children}
        <span className="sd-zoom__hint" aria-hidden="true">
          View larger
        </span>
      </button>
      {src && (
        <div className="sd-zoom__overlay" role="dialog" aria-modal="true" aria-label={alt} onClick={close}>
          <button ref={closer} type="button" className="sd-zoom__close" onClick={close}>
            Close
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

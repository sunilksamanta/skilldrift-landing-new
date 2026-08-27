"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "./icons";

/**
 * The drop zone is the only thing on this page that converts, and on a phone
 * it scrolls away after one screen. This brings it back: once the drop zone
 * has left the viewport the button follows the reader down the page, and
 * tapping it returns them to the zone with the file picker already open.
 *
 * Hidden again over the footer, so it never sits on top of the links there.
 * Desktop keeps the drop zone in view beside the copy and needs none of this —
 * the bar is display:none above the mobile breakpoint.
 *
 * Measured on scroll rather than with an IntersectionObserver: two
 * getBoundingClientRect calls on a passive listener are cheap, and it works
 * identically in embedded webviews where observers are throttled.
 */
export default function StickyUploadCta({
  dropZone,
  onUpload,
}: {
  dropZone: React.RefObject<HTMLDivElement | null>;
  onUpload: () => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const measure = () => {
      const zone = dropZone.current;
      if (!zone) return;

      // Past the drop zone: its bottom edge has gone above the viewport.
      const scrolledPast = zone.getBoundingClientRect().bottom < 0;

      // Into the footer: it has entered the lower half of the screen.
      const footer = document.querySelector("footer");
      const inFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;

      setShow(scrolledPast && !inFooter);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [dropZone]);

  return (
    <div
      className="sd-sticky-cta"
      data-visible={show ? "true" : "false"}
      aria-hidden={!show}
    >
      <button
        type="button"
        tabIndex={show ? 0 : -1}
        onClick={() => {
          dropZone.current?.scrollIntoView({ block: "center" });
          onUpload();
        }}
        style={{
          width: "100%",
          height: 54,
          borderRadius: 14,
          border: 0,
          background: "var(--btn)",
          color: "var(--btntx)",
          fontSize: 16,
          fontWeight: 500,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        Upload your resume - free
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

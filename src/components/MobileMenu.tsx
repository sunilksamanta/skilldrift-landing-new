"use client";

import { useEffect, useRef, useState } from "react";
import TrackedLink from "./TrackedLink";

export type NavItem = { href: string; label: string; external?: boolean };

/** "How it works" -> "how_it_works", so the label reads the same in a report. */
function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

/**
 * The nav for screens too narrow to carry it inline. The desktop nav is hidden
 * by CSS below 1024px, which until now left those visitors with no way to
 * reach any page but the one they landed on.
 *
 * Rendered from the same `nav` array the header uses, so the two can never
 * list different destinations.
 */
export default function MobileMenu({
  items,
  signInLabel,
  signInHref,
}: {
  items: NavItem[];
  signInLabel: string;
  signInHref: string;
}) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panel.current?.contains(target) || button.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const itemStyle: React.CSSProperties = {
    display: "block",
    padding: "13px 4px",
    fontSize: 16,
    color: "var(--tx)",
    borderBottom: "1px solid var(--line)",
  };

  return (
    <div className="sd-menu" style={{ position: "relative", flex: "0 0 auto" }}>
      <button
        ref={button}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((was) => !was)}
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          border: "1px solid var(--line2)",
          background: "transparent",
          display: "grid",
          placeItems: "center",
          padding: 0,
        }}
      >
        <span
          aria-hidden="true"
          style={{ display: "grid", gap: 4.5, width: 17 }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                height: 1.6,
                borderRadius: 2,
                background: "var(--tx)",
                transition: "transform .2s ease, opacity .2s ease",
                transform: open
                  ? i === 0
                    ? "translateY(6.1px) rotate(45deg)"
                    : i === 2
                      ? "translateY(-6.1px) rotate(-45deg)"
                      : undefined
                  : undefined,
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </span>
      </button>

      {open && (
        <div
          ref={panel}
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            right: 0,
            width: "min(280px, calc(100vw - 40px))",
            padding: "6px 18px 18px",
            borderRadius: 18,
            border: "1px solid var(--line)",
            background: "var(--bg2)",
            boxShadow: "0 24px 60px rgba(10,10,25,.18)",
            animation: "sd-rise .18s ease both",
          }}
        >
          <nav>
            {items.map((item) => (
              <TrackedLink
                key={item.label}
                href={item.href}
                section="mobile_menu"
                label={slugify(item.label)}
                newTab={item.external}
                style={itemStyle}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </TrackedLink>
            ))}
          </nav>

          <TrackedLink
            href={signInHref}
            section="mobile_menu"
            label="sign_in"
            onClick={() => setOpen(false)}
            style={{
              marginTop: 16,
              height: 46,
              borderRadius: 999,
              background: "var(--btn)",
              color: "var(--btntx)",
              fontSize: 15.5,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {signInLabel}
          </TrackedLink>
        </div>
      )}
    </div>
  );
}

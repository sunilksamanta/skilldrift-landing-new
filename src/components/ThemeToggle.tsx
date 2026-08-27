"use client";

import { useCallback } from "react";
import { Sun } from "./icons";

const buttonStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  display: "grid",
  placeItems: "center",
  borderRadius: 12,
  border: "1px solid var(--line2)",
  background: "transparent",
  color: "var(--tx)",
};

export default function ThemeToggle({ size = 20 }: { size?: number }) {
  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.dataset.sdTheme === "light" ? "dark" : "light";
    root.dataset.sdTheme = next;
    try {
      localStorage.setItem("sd-theme", next);
    } catch {
      /* storage can be unavailable — the toggle still works for this visit */
    }
  }, []);

  return (
    <button type="button" onClick={toggle} aria-label="Toggle theme" style={buttonStyle}>
      <Sun size={size} />
    </button>
  );
}

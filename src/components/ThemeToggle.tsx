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
    // Light is the default, so anything that is not explicitly dark goes dark.
    const next = root.dataset.sdTheme === "dark" ? "light" : "dark";
    root.dataset.sdTheme = next;

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#08090A" : "#F6F6F8");

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

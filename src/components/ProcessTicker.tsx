"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The "something is happening" panel shown while a slow result is still coming.
 *
 * The API reports skill gaps and job matching as a single pending state — there
 * is no per-stage progress to read — so the steps here are illustrative of the
 * real pipeline rather than measured from it. That is a deliberate trade, and
 * it comes with one rule that keeps it honest: **the ticker never claims to
 * finish.** It stops on the last step and stays there, and the bar eases toward
 * a ceiling below 100 that it never reaches. Completion is only ever rendered
 * by real data replacing this component.
 *
 * Getting that backwards — a bar that fills to 100% and then sits there — is
 * worse than no bar at all, because the visitor reads it as the page being
 * broken rather than the work being slow.
 *
 * Motion is CSS, so the global `prefers-reduced-motion` reset in globals.css
 * flattens it. Step advancement stays on a timer regardless: it is information,
 * not decoration, and someone who asked for less motion still needs to see that
 * the page is alive.
 */
export default function ProcessTicker({
  steps,
  intervalMs = 2400,
  compact = false,
}: {
  /** In pipeline order. The last one is where the ticker rests. */
  steps: string[];
  intervalMs?: number;
  /** One line at a time instead of a checklist, for cards short on room. */
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const value = useRef(0);

  // Each step dwells longer than the one before it. A flat interval walks the
  // whole list in well under the time the API actually takes, parking the
  // visitor on the final line for most of the wait — which reads as stuck.
  // Ramping the dwell keeps the early steps brisk and lets the tail stretch,
  // which is also the shape of the real pipeline: the last stage is the slow one.
  useEffect(() => {
    if (steps.length <= 1) return;
    let timer: number;
    const schedule = (i: number) => {
      if (i >= steps.length - 1) return;
      timer = window.setTimeout(() => {
        setIndex(i + 1);
        schedule(i + 1);
      }, intervalMs * (1 + i * 0.5));
    };
    schedule(0);
    return () => window.clearTimeout(timer);
  }, [steps.length, intervalMs]);

  // Each step owns a slice of the bar, and the last slice tops out at 92 — the
  // remaining 8% is the part only real data can fill.
  const ceiling = Math.min(92, ((index + 1) / steps.length) * 92);

  useEffect(() => {
    const id = window.setInterval(() => {
      const gap = ceiling - value.current;
      if (gap <= 0.3) return;
      value.current = Math.min(ceiling, value.current + Math.max(0.12, gap * 0.05));
      setPercent(value.current);
    }, 120);
    return () => window.clearInterval(id);
  }, [ceiling]);

  const bar = (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
      aria-label={steps[index]}
      style={{
        height: 4,
        borderRadius: 999,
        background: "var(--card2)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          borderRadius: 999,
          background: "linear-gradient(90deg, var(--ac), color-mix(in oklab, var(--ac) 55%, white))",
          transition: "width .25s linear",
        }}
      />
    </div>
  );

  if (compact) {
    return (
      <div style={{ marginTop: "auto", paddingTop: 12, display: "grid", gap: 9 }}>
        {bar}
        <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 18 }}>
          <span className="sd-tick-dot" aria-hidden="true" />
          {/* Keyed so each step re-runs the fade rather than swapping silently. */}
          <span
            key={steps[index]}
            className="sd-tick-line"
            style={{ fontSize: 13, color: "var(--tx3)" }}
          >
            {steps[index]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
      {bar}
      <ul style={{ display: "grid", gap: 8 }}>
        {steps.map((step, i) => {
          const done = i < index;
          const now = i === index;
          // Upcoming steps stay in the DOM at low opacity: the list keeps its
          // height, so nothing below it jumps as each step lands.
          return (
            <li
              key={step}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13.5,
                lineHeight: 1.4,
                color: now ? "var(--tx)" : "var(--tx3)",
                opacity: done ? 0.55 : now ? 1 : 0.3,
                transition: "opacity .35s ease, color .35s ease",
              }}
            >
              <span
                aria-hidden="true"
                style={{ flex: "0 0 auto", width: 14, height: 14, display: "grid", placeItems: "center" }}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="var(--ok)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                ) : now ? (
                  <span className="sd-tick-dot" />
                ) : (
                  <span
                    style={{
                      width: 5, height: 5, borderRadius: 999,
                      background: "var(--line2)", display: "block",
                    }}
                  />
                )}
              </span>
              <span>{step}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

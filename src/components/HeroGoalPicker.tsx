"use client";

import { useEffect, useState } from "react";
import { trackIntentSelected } from "@/lib/analytics/cta";

/*
 * The three homepage goals, laid out as one career line rather than three
 * separate boxes: first job, then a new job, then growing in the role. The
 * pick uses the same call as the doors below (trackIntentSelected), which
 * writes `sd_anon_intent`, so the upload and sign-up carry it. Picking is
 * optional; the upload card works the same without a pick.
 */
export const GOALS = [
  { intent: "Land my first job", label: "First job or internship" },
  { intent: "Move to a new job", label: "A new job or field" },
  { intent: "Get promoted where I am", label: "Grow where I am" },
];

export default function HeroGoalPicker({
  heading = "What do you want next?",
  onPick,
  marginTop = 28,
  compact = false,
}: {
  /** The question above the chips. The homepage asks "What do you want next?". */
  heading?: string;
  /** Told about every pick, so a card can send the goal with its own events. */
  onPick?: (intent: string) => void;
  marginTop?: number;
  /** Inside the upload card: smaller chips and no connecting line, which
   *  would cross the chips once they wrap in the narrower column. */
  compact?: boolean;
} = {}) {
  const [picked, setPicked] = useState<number | null>(null);
  // Stays in step when the goal is picked further down the page.
  useEffect(() => {
    const on = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      if (typeof i === "number" && GOALS[i]) setPicked(i);
    };
    window.addEventListener("sd:goal", on);
    return () => window.removeEventListener("sd:goal", on);
  }, []);
  return (
    <div style={{ marginTop }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--tx2)" }}>
        {heading}
      </div>
      <div
        role="radiogroup"
        aria-label={heading}
        style={{ position: "relative", marginTop: 12, display: "inline-flex", flexWrap: "wrap", gap: 10 }}
      >
        {!compact && <span
          aria-hidden="true"
          className="sd-goal-line"
          style={{
            position: "absolute",
            left: 18,
            right: 18,
            top: "50%",
            height: 2,
            transform: "translateY(-50%)",
            background: "linear-gradient(90deg, rgba(124,93,249,.15), rgba(124,93,249,.55), rgba(124,93,249,.15))",
          }}
        />}
        {GOALS.map((g, i) => {
          const on = picked === i;
          return (
            <button
              key={g.intent}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => {
                trackIntentSelected(g.intent);
                setPicked(i);
                onPick?.(g.intent);
                // The goal doors below follow the pick, so the visitor sees
                // what SkillDrift does for that goal without picking twice.
                window.dispatchEvent(new CustomEvent("sd:goal", { detail: i }));
              }}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                minHeight: compact ? 40 : 44,
                padding: compact ? "0 15px 0 12px" : "0 18px 0 14px",
                borderRadius: 999,
                fontSize: compact ? 14 : 15,
                fontWeight: 500,
                color: on ? "#FFFFFF" : "var(--tx)",
                border: on ? "1px solid transparent" : "1px solid var(--acline)",
                background: on ? "linear-gradient(135deg,#7C5DF9,#5B3FD0)" : "var(--card)",
                transition: "background .2s, color .2s",
                cursor: "pointer",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: on ? "#FFFFFF" : "var(--ac)",
                  opacity: on ? 1 : 0.7 + i * 0.15,
                }}
              />
              {g.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

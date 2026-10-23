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
const goals = [
  { intent: "Land my first job", label: "First job or internship" },
  { intent: "Move to a new job", label: "A new job or field" },
  { intent: "Get promoted where I am", label: "Grow where I am" },
];

export default function HeroGoalPicker() {
  const [picked, setPicked] = useState<number | null>(null);
  // Stays in step when the goal is picked further down the page.
  useEffect(() => {
    const on = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      if (typeof i === "number" && goals[i]) setPicked(i);
    };
    window.addEventListener("sd:goal", on);
    return () => window.removeEventListener("sd:goal", on);
  }, []);
  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--tx2)" }}>
        What do you want next?
      </div>
      <div
        role="radiogroup"
        aria-label="What do you want next?"
        style={{ position: "relative", marginTop: 12, display: "inline-flex", flexWrap: "wrap", gap: 10 }}
      >
        <span
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
        />
        {goals.map((g, i) => {
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
                // The goal doors below follow the pick, so the visitor sees
                // what SkillDrift does for that goal without picking twice.
                window.dispatchEvent(new CustomEvent("sd:goal", { detail: i }));
              }}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                minHeight: 44,
                padding: "0 18px 0 14px",
                borderRadius: 999,
                fontSize: 15,
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

"use client";

import { useEffect, useRef, useState } from "react";
import type { GuestStatus } from "@/lib/guest-api";
import type { Phase } from "@/hooks/useGuestAnalysis";

/**
 * The wait is real work — parsing, scoring, then matching — but the server
 * reports it as three coarse states, not a percentage. So the ring is honest
 * about the *stage* and estimated within it: each stage has a ceiling the bar
 * eases toward and never crosses until the server actually moves on. It can
 * stall short of the ceiling, which is the truth, and it never goes backwards.
 */
const STAGES: {
  match: (phase: Phase, status: GuestStatus | null) => boolean;
  ceiling: number;
  title: string;
  note: string;
}[] = [
  {
    match: (phase) => phase === "uploading",
    ceiling: 18,
    title: "Uploading your resume",
    note: "Sending it over a secure connection",
  },
  {
    match: (_, status) => status === "analysis_ready",
    ceiling: 92,
    title: "Scoring your skills",
    note: "Your score is in. Finding your gaps and matches",
  },
  {
    match: (phase) => phase === "processing",
    ceiling: 70,
    title: "Reading your resume",
    note: "Pulling out roles, skills and outcomes",
  },
];

const DONE = {
  ceiling: 100,
  title: "Done",
  note: "Bringing your results in",
};

export default function UploadProgress({
  phase,
  status,
  fileName,
}: {
  phase: Phase;
  status: GuestStatus | null;
  fileName: string | null;
}) {
  const done = phase === "ready";
  const stage = done
    ? DONE
    : (STAGES.find((s) => s.match(phase, status)) ?? STAGES[2]);

  const [percent, setPercent] = useState(0);
  const value = useRef(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      const gap = stage.ceiling - value.current;
      if (gap <= 0.4) return;
      // Eases in: fast while there is a lot of headroom, crawling near the
      // ceiling, so it never looks stuck at a hard stop.
      value.current = Math.min(stage.ceiling, value.current + Math.max(0.15, gap * 0.06));
      setPercent(Math.round(value.current));
    }, 120);
    return () => window.clearInterval(id);
  }, [stage.ceiling]);

  const R = 34;
  const CIRCUMFERENCE = 2 * Math.PI * R;

  return (
    <div style={{ display: "grid", placeItems: "center", gap: 14, textAlign: "center" }}>
      <div style={{ position: "relative", width: 88, height: 88 }}>
        <svg viewBox="0 0 80 80" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
          <circle cx="40" cy="40" r={R} fill="none" stroke="var(--card2)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={R}
            fill="none"
            stroke="var(--ac)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
            style={{ transition: "stroke-dashoffset .25s linear" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {percent}%
        </div>
      </div>

      <div style={{ fontSize: 17, fontWeight: 500, color: "var(--tx)" }}>
        {stage === STAGES[2] && fileName ? `Reading ${fileName}` : stage.title}
      </div>
      <div style={{ fontSize: 14, color: "var(--tx3)", maxWidth: 300 }}>{stage.note}</div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import type { GuestState } from "@/hooks/useGuestAnalysis";
import type { GuestJob } from "@/lib/guest-api";
import { Lock } from "./icons";
import TrackedLink from "./TrackedLink";
import { AnalyticsEvents, track } from "@/lib/analytics";
import { anonSessionId } from "@/lib/anon-session";
import { homeCta } from "@/lib/cta";

/* ------------------------------------------------------------------ score */

type Band = {
  label: string;
  /** Token name without the `--`, so the three tones can be derived from it. */
  tone: "t-green" | "t-blue" | "t-amber" | "t-red";
  note: string;
};

/** The band a readiness score falls into. Thresholds are 85 / 70 / 50. */
function categoryFor(score: number): Band {
  if (score >= 85)
    return {
      label: "Excellent",
      tone: "t-green",
      note: "Highly optimized for ATS systems",
    };
  if (score >= 70)
    return {
      label: "Very Good",
      tone: "t-blue",
      note: "Performs well with most ATS systems",
    };
  if (score >= 50)
    return {
      label: "Good",
      tone: "t-amber",
      note: "Room for ATS optimization",
    };
  return {
    label: "Needs Work",
    tone: "t-red",
    note: "May face challenges with ATS systems",
  };
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/** The scale the gauge is read against, weakest first. */
const SCALE: { label: string; tone: Band["tone"]; from: number }[] = [
  { label: "Needs work", tone: "t-red", from: 0 },
  { label: "Good", tone: "t-amber", from: 50 },
  { label: "Very good", tone: "t-blue", from: 70 },
  { label: "Excellent", tone: "t-green", from: 85 },
];

const POSITIONS: Record<string, string> = {
  below_average: "Below average",
  average: "Average",
  above_average: "Above average",
  excellent: "Excellent",
};

/* ------------------------------------------------------------- geometry */

const GAUGE_START = 150;
const GAUGE_SWEEP = 240;

/** Rounded, because unrounded floats differ in the last digit between the
    server and the client render and React reports that as a hydration mismatch. */
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(cx + r * Math.cos(rad)), y: round(cy + r * Math.sin(rad)) };
}

function arcPath(cx: number, cy: number, r: number, from: number, to: number) {
  const a = polar(cx, cy, r, from);
  const b = polar(cx, cy, r, to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}

const atScore = (value: number) => GAUGE_START + (GAUGE_SWEEP * clamp(value)) / 100;

/* --------------------------------------------------------------- reading */

/** The three weakest skill categories are what "holding your score down" means. */
function pickGaps(state: GuestState) {
  const categories = state.skillGap?.skillCategories ?? [];
  return [...categories]
    .sort((a, b) => a.skillLevelScore - b.skillLevelScore)
    .slice(0, 3);
}

/**
 * The role the analysis points the visitor at next. `targetRole` is often a
 * full sentence rather than a job title, so the UI clamps it to two lines.
 */
function suggestedRole(state: GuestState): string | null {
  const target = state.skillGap?.domainAnalysis?.targetRole?.trim();
  if (target) return target;
  const titles = state.analysis?.analysis?.jobSearchTitles ?? [];
  const current = state.analysis?.analysis?.jobSearchTitle;
  return titles.find((title) => title && title !== current) ?? null;
}

/** Resumes are often typed in caps; anything else is left as the person wrote it. */
function titleCase(value: string) {
  if (value !== value.toUpperCase()) return value;
  return value
    .toLowerCase()
    .replace(/(^|[\s'-])([a-z])/g, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

/** Who this reading belongs to. The email is deliberately not shown. */
function person(state: GuestState) {
  const name = state.analysis?.analysis?.personalInfo?.name?.trim();
  if (!name) return null;

  const words = titleCase(name).split(/\s+/).filter(Boolean);
  if (words.length === 0) return null;
  return { name: words.join(" "), firstName: words[0] };
}

function scoredAgainst(state: GuestState): string {
  const a = state.analysis?.analysis;
  return a?.jobSearchTitle || state.analysis?.industryType || "your target role";
}

type RadarAxis = { label: string; you: number; industry: number };

/**
 * Prefers the API's own `radarChartData`, falling back to the skill categories
 * — which carry the same two numbers per axis — when it isn't sent.
 */
function radarAxes(state: GuestState): RadarAxis[] {
  const radar = state.skillGap?.radarChartData;
  const labels = radar?.skills ?? [];

  if (labels.length >= 3) {
    return labels.slice(0, 8).map((label, i) => ({
      label,
      you: clamp(radar?.candidateScores?.[i] ?? 0),
      industry: clamp(radar?.industryAverages?.[i] ?? 0),
    }));
  }

  const categories = state.skillGap?.skillCategories ?? [];
  if (categories.length >= 3) {
    return categories.slice(0, 8).map((c) => ({
      label: c.category,
      you: clamp(c.skillLevelScore),
      industry: clamp(c.industryBenchmark),
    }));
  }

  return [];
}

/**
 * Reports the panel once it is genuinely on screen, and again — with how far
 * down it the visitor got — when they leave it. "Returned" is not "seen": the
 * panel can be rendered below the fold, or in a background tab.
 */
function useResultViewed(
  node: React.RefObject<HTMLElement | null>,
  score: number,
  analysisId: string | null,
) {
  useEffect(() => {
    const el = node.current;
    // No analysis id means the analysis has not landed yet, and there is
    // nothing to key the guard on.
    if (!el || !analysisId) return;

    // One event per completed analysis, not per render, per mount or per
    // reload. The effect re-runs whenever the score arrives, React remounts in
    // development, and a reload rebuilds the panel from cache — a ref-only
    // guard survived none of those, which is what turned one view into seven.
    const key = viewKey(analysisId);
    if (alreadyViewed(key)) return;

    const readyAt = performance.now();
    let fired = false;

    const check = () => {
      if (fired) return;
      const box = el.getBoundingClientRect();
      const onScreen =
        Math.min(window.innerHeight, box.bottom) - Math.max(0, box.top);
      // A quarter of the panel, or a quarter of the screen for a panel taller
      // than the viewport.
      if (onScreen < Math.min(box.height, window.innerHeight) * 0.25) return;

      fired = true;
      // Written before the event, so a second mount racing this one in the
      // same tick reads the guard rather than firing again.
      markViewed(key);

      const read = Math.max(0, -box.top) + onScreen;
      track(AnalyticsEvents.ANONYMOUS_RESULT_VIEWED, {
        readiness_score: score,
        time_to_view_ms: Math.round(performance.now() - readyAt),
        scroll_depth_pct: Math.min(100, Math.round((read / box.height) * 100)),
      });
      detach();
    };

    const detach = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return detach;
  }, [node, score, analysisId]);
}

/**
 * The one view already reported, as `<anon session>:<analysis>`. Persisted
 * rather than held in a ref so it survives a reload of the same result.
 */
const VIEWED_KEY = "sd-anon-result-viewed";

function viewKey(analysisId: string) {
  return `${anonSessionId() ?? "anon"}:${analysisId}`;
}

function alreadyViewed(key: string): boolean {
  try {
    return localStorage.getItem(VIEWED_KEY) === key;
  } catch {
    return false;
  }
}

function markViewed(key: string): void {
  try {
    localStorage.setItem(VIEWED_KEY, key);
  } catch {
    /* private mode — the guard degrades to once per mount */
  }
}

/* ------------------------------------------------------------------ view */

const cardStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: 16,
  border: "1px solid var(--line)",
  background: "var(--card)",
  padding: 18,
  display: "flex",
  flexDirection: "column",
};

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11.5,
        fontWeight: 500,
        letterSpacing: "0.10em",
        textTransform: "uppercase",
        color: "var(--tx3)",
      }}
    >
      {children}
    </div>
  );
}

export default function GuestResultSection({
  state,
  guestToken,
}: {
  state: GuestState;
  guestToken: string | null;
}) {
  const panel = useRef<HTMLElement | null>(null);
  const score = clamp(state.analysis?.analysis?.overall?.atsScore ?? 0);
  useResultViewed(panel, score, state.analysis?.sessionId ?? null);
  const band = categoryFor(score);
  const gaps = pickGaps(state);
  const gapsPending = !state.skillGap && state.status !== "completed";
  const weaknesses = state.analysis?.analysis?.overall?.weaknesses ?? [];
  const axes = radarAxes(state);
  const nextRole = suggestedRole(state);
  const who = person(state);

  // A job the matcher skipped comes back with `analysis: null`. It is still a
  // real opening, so it is shown without a score rather than dropped — which
  // used to empty the card and fall through to the locked placeholder.
  const allJobs = [...(state.jobs?.jobs ?? [])].sort(
    (a, b) => (b.analysis?.matchScore ?? -1) - (a.analysis?.matchScore ?? -1),
  );
  const shown = allJobs.slice(0, 3);
  const teased = allJobs.slice(3, 4);

  // The analysis already read their name and email off the resume, so the
  // sign-up form is filled in for them rather than asking twice.
  const personal = state.analysis?.analysis?.personalInfo;
  const signUpHref = homeCta("result_create_account", {
    name: who?.name ?? personal?.name,
    email: personal?.email,
    guestToken,
  });

  return (
    <section
      id="result"
      ref={panel}
      style={{ padding: "0 0 64px", animation: "sd-rise .5s ease both" }}
    >
      <div className="wrap">
        {who && (
          <h2
            style={{
              marginBottom: 16,
              fontSize: "clamp(22px,2.4vw,30px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
            }}
          >
            Hey <span style={{ color: "var(--ac)" }}>{who.firstName}</span>,{" "}
            <span style={{ fontWeight: 400, color: "var(--tx3)" }}>
              here&rsquo;s where you stand.
            </span>
          </h2>
        )}

        <div
          className="sd-pad-40"
          style={{
            borderRadius: 24,
            border: "1px solid var(--line)",
            background: "var(--bg2)",
            padding: 22,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -280,
              right: -180,
              width: 760,
              height: 760,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at 50% 50%, rgba(124,93,249,.20), transparent 62%)",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "10px 28px",
              flexWrap: "wrap",
              paddingBottom: 14,
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ flex: "0 1 auto", minWidth: 0 }}>
              <CardTitle>Scored against</CardTitle>
              <div
                style={{
                  marginTop: 5,
                  fontSize: 19,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                }}
              >
                {scoredAgainst(state)}
              </div>
            </div>

            {nextRole && (
              <>
                <span className="sd-split-rule" aria-hidden="true" />
                <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                  <CardTitle>Suggested next role</CardTitle>
                  <div
                    title={nextRole}
                    style={{
                      marginTop: 5,
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: 1.4,
                      letterSpacing: "-0.015em",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {nextRole}
                  </div>
                </div>
              </>
            )}
          </div>

          <div
            style={{
              position: "relative",
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(290px,100%),1fr))",
              gap: 12,
              alignItems: "stretch",
            }}
          >
            <ScoreCard
              band={band}
              score={score}
              position={
                POSITIONS[state.skillGap?.overallAssessment?.competitivePosition ?? ""]
              }
            />
            <RadarCard axes={axes} pending={gapsPending} />
            <JobsCard
              shown={shown}
              teased={teased}
              total={allJobs.length}
            />
          </div>

          <GapsStrip
            gaps={gaps}
            pending={gapsPending}
            weaknesses={weaknesses}
            tone={band.tone}
          />

          <div
            style={{
              position: "relative",
              marginTop: 12,
              padding: "20px 26px",
              borderRadius: 16,
              overflow: "hidden",
              background:
                "linear-gradient(168deg,#7C5DF9,#5B3FD0 62%,#4A32B4)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px 28px",
              flexWrap: "wrap",
            }}
          >
            {/* Same grid wash as the Unlimited plan card, so the two closing
                asks read as one brand rather than two. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
                backgroundSize: "58px 58px",
              }}
            />

            <div
              style={{
                position: "relative",
                flex: "1 1 300px",
                minWidth: 0,
                maxWidth: 660,
              }}
            >
              <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.015em" }}>
                Create a free account to see the rest
              </h3>
              <p
                style={{
                  marginTop: 6,
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,.82)",
                }}
              >
                All the matches, the full gap report, and the learning areas that
                close it. Your resume is already here, and you will not upload
                it again.
              </p>
            </div>
            <TrackedLink
              href={signUpHref}
              section="anon_result"
              label="create_account"
              style={{
                position: "relative",
                flex: "0 0 auto",
                height: 46,
                padding: "0 26px",
                borderRadius: 13,
                background: "#FFFFFF",
                color: "#3A2694",
                fontSize: 15.5,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Create free account
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 1 · gauge */

function ScoreCard({
  band,
  score,
  position,
}: {
  band: Band;
  score: number;
  /** How the resume reads against the market, when the API has scored it. */
  position?: string;
}) {
  const CX = 100;
  const CY = 96;
  const R = 72;
  const angle = atScore(score);
  const tip = polar(CX, CY, R - 15, angle);
  const left = polar(CX, CY, 8, angle - 90);
  const right = polar(CX, CY, 8, angle + 90);
  const gradient = `sd-gauge-${band.tone}`;

  return (
    <div
      className="sd-result-card"
      style={{ ...cardStyle, alignItems: "center", textAlign: "center" }}
    >
      <CardTitle>Resume readiness</CardTitle>

      <div style={{ width: "100%", maxWidth: 196, marginTop: 0 }}>
        <svg viewBox="0 0 200 140" style={{ width: "100%", display: "block" }}>
          <defs>
            <linearGradient id={gradient} x1="0" y1="1" x2="1" y2="0">
              <stop
                offset="0%"
                stopColor={`var(--${band.tone})`}
                stopOpacity="0.45"
              />
              <stop offset="100%" stopColor={`var(--${band.tone})`} />
            </linearGradient>
          </defs>

          <path
            d={arcPath(CX, CY, R, atScore(0), atScore(100))}
            fill="none"
            stroke="var(--card2)"
            strokeWidth={11}
            strokeLinecap="round"
          />

          {/* Quarter marks only — enough to read the dial, quiet enough to ignore. */}
          {[0, 25, 50, 75, 100].map((v) => {
            const outer = polar(CX, CY, R - 10, atScore(v));
            const inner = polar(CX, CY, R - 16, atScore(v));
            return (
              <line
                key={v}
                x1={outer.x}
                y1={outer.y}
                x2={inner.x}
                y2={inner.y}
                stroke="var(--line2)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            );
          })}

          <path
            d={arcPath(CX, CY, R, atScore(0), atScore(score))}
            fill="none"
            stroke={`url(#${gradient})`}
            strokeWidth={11}
            strokeLinecap="round"
          />

          <polygon
            points={`${left.x},${left.y} ${tip.x},${tip.y} ${right.x},${right.y}`}
            fill="var(--tx)"
            opacity={0.82}
          />
          <circle cx={CX} cy={CY} r={8} fill="var(--tx)" opacity={0.82} />
          <circle cx={CX} cy={CY} r={3.5} fill="var(--card)" />
        </svg>
      </div>

      <span
        style={{
          marginTop: 0,
          padding: "5px 15px",
          borderRadius: 999,
          fontSize: 14.5,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          background: `var(--${band.tone}-soft)`,
          color: `var(--${band.tone}-tx)`,
        }}
      >
        {band.label}
      </span>

      <p
        style={{
          marginTop: 10,
          maxWidth: 220,
          fontSize: 13,
          lineHeight: 1.45,
          color: "var(--tx2)",
        }}
      >
        {band.note}
      </p>

      <div style={{ marginTop: "auto", paddingTop: 18, width: "100%" }}>
        {position && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 14,
              paddingBottom: 12,
              borderBottom: "1px solid var(--line)",
              fontSize: 12.5,
            }}
          >
            <span style={{ color: "var(--tx3)" }}>Against your target role</span>
            <span style={{ fontWeight: 500 }}>{position}</span>
          </div>
        )}

        <div style={{ display: "flex", gap: 5 }}>
          {SCALE.map((step) => {
            const active = step.tone === band.tone;
            return (
              <div key={step.label} style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    height: 4,
                    borderRadius: 99,
                    background: active ? `var(--${step.tone})` : "var(--card2)",
                  }}
                />
                <div
                  style={{
                    marginTop: 7,
                    fontSize: 10.5,
                    lineHeight: 1.2,
                    textAlign: "center",
                    fontWeight: active ? 600 : 400,
                    color: active ? `var(--${step.tone}-tx)` : "var(--tx3)",
                  }}
                >
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 2 · radar */

const R_CX = 224;
const R_CY = 150;
const R_R = 86;

function polygon(axes: RadarAxis[], pick: (a: RadarAxis) => number, scale = 1) {
  return axes
    .map((axis, i) => {
      const deg = -90 + (360 * i) / axes.length;
      const p = polar(R_CX, R_CY, (R_R * pick(axis) * scale) / 100, deg);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

/** Axis labels are often full phrases — clamp them so they can't collide. */
function shortLabel(label: string) {
  return label.length > 18 ? `${label.slice(0, 17).trimEnd()}…` : label;
}

function RadarCard({ axes, pending }: { axes: RadarAxis[]; pending: boolean }) {
  const rings = [0.25, 0.5, 0.75, 1];
  const skeleton = axes.length === 0;
  const shape: RadarAxis[] = skeleton
    ? Array.from({ length: 6 }, (_, i) => ({
        label: "",
        you: 58 + ((i * 7) % 18),
        industry: 66,
      }))
    : axes;

  return (
    <div className="sd-result-card" style={{ ...cardStyle, alignItems: "center" }}>
      <CardTitle>Skill gap map</CardTitle>

      <div
        style={{
          width: "100%",
          marginTop: 4,
          filter: skeleton ? "blur(5px)" : undefined,
          opacity: skeleton ? 0.45 : 1,
        }}
      >
        <svg viewBox="18 30 412 240" style={{ width: "100%", display: "block" }}>
          {rings.map((r) => (
            <polygon
              key={r}
              points={polygon(shape, () => 100, r)}
              fill="none"
              stroke="var(--line)"
              strokeWidth={1}
            />
          ))}
          {shape.map((_, i) => {
            const deg = -90 + (360 * i) / shape.length;
            const end = polar(R_CX, R_CY, R_R, deg);
            return (
              <line
                key={`axis-${i}`}
                x1={R_CX}
                y1={R_CY}
                x2={end.x}
                y2={end.y}
                stroke="var(--line)"
                strokeWidth={1}
              />
            );
          })}

          <polygon
            points={polygon(shape, (a) => a.industry)}
            fill="var(--ok)"
            fillOpacity={0.16}
            stroke="var(--ok)"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <polygon
            points={polygon(shape, (a) => a.you)}
            fill="var(--ac)"
            fillOpacity={0.24}
            stroke="var(--ac)"
            strokeWidth={2}
            strokeLinejoin="round"
          />

          {!skeleton &&
            shape.map((axis, i) => {
              const deg = -90 + (360 * i) / shape.length;
              const p = polar(R_CX, R_CY, R_R + 15, deg);
              const dx = p.x - R_CX;
              const anchor =
                Math.abs(dx) < 6 ? "middle" : dx > 0 ? "start" : "end";
              return (
                <text
                  key={`label-${i}`}
                  x={p.x}
                  y={p.y}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  fontSize={10.5}
                  fill="var(--tx2)"
                >
                  {shortLabel(axis.label)}
                </text>
              );
            })}
        </svg>
      </div>

      {skeleton ? (
        <p style={{ marginTop: "auto", fontSize: 13.5, color: "var(--tx3)" }}>
          {pending
            ? "Mapping your skills against the role…"
            : "Your map is waiting in your free account."}
        </p>
      ) : (
        <div
          style={{
            marginTop: "auto",
            paddingTop: 8,
            display: "flex",
            gap: 20,
            fontSize: 13,
            color: "var(--tx2)",
          }}
        >
          <Key color="var(--ac)" label="You" />
          <Key color="var(--ok)" label="Industry average" />
        </div>
      )}
    </div>
  );
}

function Key({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        style={{ width: 11, height: 11, borderRadius: 3, background: color }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------- 3 · jobs */

/** Placeholder rows for the locked state — blurred past reading, never announced. */
const PLACEHOLDER_JOBS = [
  { score: 88, title: "Senior Platform Engineer", meta: "Northwind Labs · Bengaluru" },
  { score: 81, title: "Solutions Architect", meta: "Meridian Systems · Remote" },
  { score: 76, title: "Engineering Manager", meta: "Halcyon Digital · Pune" },
  { score: 71, title: "Lead Product Engineer", meta: "Vantage Works · Hyderabad" },
];

function JobsCard({
  shown,
  teased,
  total,
}: {
  shown: GuestJob[];
  teased: GuestJob[];
  total: number;
}) {
  const locked = total === 0;

  return (
    <div className="sd-result-card" style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <CardTitle>{locked ? "Probable matches" : "Roles you match now"}</CardTitle>
        <span
          style={{
            flex: "0 0 auto",
            padding: "5px 12px",
            borderRadius: 999,
            fontSize: 12.5,
            fontWeight: 500,
            background: "var(--acsoft)",
            color: "var(--ac)",
          }}
        >
          {locked ? "20+ jobs available" : "20+ more jobs"}
        </span>
      </div>

      <ul
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {locked
          ? PLACEHOLDER_JOBS.map((job, i) => (
              <JobRow
                key={job.title}
                score={job.score}
                title={job.title}
                meta={job.meta}
                blur={4 + i * 0.8}
                dim={0.6 - i * 0.08}
                lock={i === 0}
              />
            ))
          : [
              ...shown.map((job) => (
                <JobRow
                  key={job.jobId}
                  score={job.analysis?.matchScore}
                  title={job.jobTitle}
                  meta={[job.employerName, job.jobLocation].filter(Boolean).join(" · ")}
                />
              )),
              ...teased.map((job, i) => (
                <JobRow
                  key={job.jobId}
                  score={job.analysis?.matchScore}
                  title={job.jobTitle}
                  meta={[job.employerName, job.jobLocation].filter(Boolean).join(" · ")}
                  blur={i === 0 ? 4.5 : 6}
                  dim={i === 0 ? 0.55 : 0.4}
                  lock={i === 0}
                />
              )),
            ]}
      </ul>

      <p style={{ marginTop: "auto", paddingTop: 14, fontSize: 12, color: "var(--tx3)" }}>
        {locked
          ? "Openings matched to this profile. Names and scores unlock with your account."
          : "Scored against your resume, not keyword-matched."}
      </p>
    </div>
  );
}

function JobRow({
  score,
  title,
  meta,
  blur,
  dim,
  lock,
}: {
  /** Absent when the matcher skipped this job — no score is invented for it. */
  score?: number | null;
  title: string;
  meta: string;
  blur?: number;
  dim?: number;
  /** Draws the lock badge. Set on the first blurred row of a list only. */
  lock?: boolean;
}) {
  return (
    <li
      aria-hidden={blur ? true : undefined}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "8px 10px",
        borderRadius: 11,
        border: "1px solid var(--line)",
        background: "var(--card2)",
      }}
    >
      {/* The frame stays sharp; only what is behind the paywall blurs. */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          minWidth: 0,
          width: "100%",
          filter: blur ? `blur(${blur}px)` : undefined,
          opacity: dim,
        }}
      >
        <span
          style={{
            flex: "0 0 auto",
            width: 34,
            height: 34,
            borderRadius: 10,
            display: "grid",
            placeItems: "center",
            background: score == null ? "var(--card)" : "var(--acsoft)",
            border: score == null ? "1px solid var(--line)" : undefined,
            color: score == null ? "var(--tx3)" : "var(--ac)",
            fontSize: 14.5,
            fontWeight: 600,
          }}
        >
          {score ?? title.slice(0, 1).toUpperCase()}
        </span>
        <span style={{ minWidth: 0 }}>
          <span
            style={{
              display: "block",
              fontSize: 14.5,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
          <span
            style={{
              display: "block",
              marginTop: 2,
              fontSize: 12.5,
              color: "var(--tx3)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {meta}
          </span>
        </span>
      </span>

      {lock && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            pointerEvents: "none",
          }}
        >
          <span
            title="Unlocks with a free account"
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              background: "var(--card)",
              border: "1px solid var(--line2)",
              color: "var(--tx2)",
            }}
          >
            <Lock />
          </span>
        </span>
      )}
    </li>
  );
}

/* ------------------------------------------------------------ 4 · gaps */

function GapsStrip({
  gaps,
  pending,
  weaknesses,
  tone,
}: {
  gaps: ReturnType<typeof pickGaps>;
  pending: boolean;
  weaknesses: string[];
  tone: Band["tone"];
}) {
  const heading =
    gaps.length > 0
      ? `${gaps.length === 3 ? "Three" : gaps.length} things are holding your score down`
      : "What's holding your score down";

  return (
    <div
      style={{
        position: "relative",
        marginTop: 12,
        borderRadius: 16,
        border: "1px solid var(--line)",
        background: "var(--card)",
        padding: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>
          {heading}
        </h3>
        <p style={{ fontSize: 13.5, color: "var(--tx3)" }}>
          Named for free. The detail, and what to do about each one, is behind signup.
        </p>
      </div>

      {gaps.length > 0 ? (
        <ul
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(250px,100%),1fr))",
            gap: 10,
          }}
        >
          {gaps.map((gap, i) => {
            const delta = Math.max(0, gap.industryBenchmark - gap.skillLevelScore);
            return (
              <li
                key={gap.category}
                style={{
                  padding: "12px 14px",
                  borderRadius: 11,
                  border: "1px solid var(--line)",
                  background: "var(--card2)",
                }}
              >
                {/* Two lines are always reserved, so the bars line up across
                    the three cards however long the category names run. */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 14.5,
                    fontWeight: 500,
                    lineHeight: 1.4,
                    minHeight: "2.8em",
                  }}
                >
                  <span style={{ color: "var(--tx3)", flex: "0 0 auto" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    title={gap.category}
                    style={{
                      minWidth: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {gap.category}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    position: "relative",
                    height: 6,
                    borderRadius: 99,
                    background: "var(--line)",
                  }}
                >
                  <div
                    style={{
                      width: `${clamp(gap.skillLevelScore)}%`,
                      height: "100%",
                      borderRadius: 99,
                      background: `var(--${tone})`,
                      transition: "width .8s ease",
                    }}
                  />
                  <span
                    aria-hidden="true"
                    title="Industry average"
                    style={{
                      position: "absolute",
                      top: -3,
                      left: `${clamp(gap.industryBenchmark)}%`,
                      width: 2,
                      height: 13,
                      borderRadius: 2,
                      background: "var(--ok)",
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    fontSize: 13,
                    color: "var(--tx3)",
                  }}
                >
                  <span>
                    You {clamp(gap.skillLevelScore)}% &middot; average{" "}
                    {clamp(gap.industryBenchmark)}%
                  </span>
                  {delta > 0 && (
                    <span style={{ flex: "0 0 auto", color: `var(--${tone}-tx)` }}>
                      &minus;{delta}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : pending ? (
        <ul
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(250px,100%),1fr))",
            gap: 10,
          }}
        >
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              style={{
                height: 104,
                borderRadius: 14,
                border: "1px solid var(--line)",
                background: "var(--card2)",
              }}
            />
          ))}
          <li
            style={{
              gridColumn: "1 / -1",
              fontSize: 13,
              color: "var(--tx3)",
            }}
          >
            Still scoring your skill gaps&hellip;
          </li>
        </ul>
      ) : (
        <ul
          style={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {(weaknesses.length > 0
            ? weaknesses.slice(0, 3)
            : ["We couldn't score your gaps from this resume."]
          ).map((item) => (
            <li key={item} style={{ fontSize: 15, lineHeight: 1.55, color: "var(--tx2)" }}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

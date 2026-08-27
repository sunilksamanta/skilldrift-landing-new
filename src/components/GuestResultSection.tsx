"use client";

import type { GuestState } from "@/hooks/useGuestAnalysis";
import type { GuestJob } from "@/lib/guest-api";
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

/* ------------------------------------------------------------------ view */

const cardStyle: React.CSSProperties = {
  borderRadius: 20,
  border: "1px solid var(--line)",
  background: "var(--card)",
  padding: 26,
  display: "flex",
  flexDirection: "column",
};

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12.5,
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
  const score = clamp(state.analysis?.analysis?.overall?.atsScore ?? 0);
  const band = categoryFor(score);
  const gaps = pickGaps(state);
  const gapsPending = !state.skillGap && state.status !== "completed";
  const weaknesses = state.analysis?.analysis?.overall?.weaknesses ?? [];
  const axes = radarAxes(state);

  const allJobs = (state.jobs?.jobs ?? []).filter((job) => job.analysis);
  const shown = allJobs.slice(0, 3);
  const teased = allJobs.slice(3, 5);
  const more = Math.max(0, allJobs.length - shown.length);

  const signUpHref = guestToken
    ? `${homeCta("result_create_account")}&guestToken=${encodeURIComponent(guestToken)}`
    : homeCta("result_create_account");

  return (
    <section
      id="result"
      style={{ padding: "0 0 110px", animation: "sd-rise .5s ease both" }}
    >
      <div className="wrap">
        <div
          className="sd-pad-40"
          style={{
            borderRadius: 26,
            border: "1px solid var(--line)",
            background: "var(--bg2)",
            padding: 40,
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
              gap: 16,
              flexWrap: "wrap",
              paddingBottom: 24,
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div>
              <CardTitle>Scored against</CardTitle>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                }}
              >
                {scoredAgainst(state)}
              </div>
            </div>
            <span style={{ fontSize: 14, color: "var(--tx3)" }}>
              Free, and yours &mdash; not a sample. No account, no redirect.
            </span>
          </div>

          <div
            style={{
              position: "relative",
              marginTop: 26,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
              gap: 20,
              alignItems: "stretch",
            }}
          >
            <ScoreCard band={band} score={score} />
            <RadarCard axes={axes} pending={gapsPending} />
            <JobsCard
              shown={shown}
              teased={teased}
              more={more}
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
              marginTop: 20,
              padding: "28px 32px",
              borderRadius: 20,
              border: "1px solid var(--acline)",
              background: "var(--acsoft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3 style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.01em" }}>
                Create a free account to see the rest
              </h3>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--tx2)",
                }}
              >
                {allJobs.length > 0 ? `All ${allJobs.length} matches, the` : "Every match, the"}{" "}
                full gap report, and the roadmap that closes it.
                <br />
                Your resume is already here &mdash; you will not upload it again.
              </p>
            </div>
            <a
              href={signUpHref}
              style={{
                flex: "0 0 auto",
                height: 54,
                padding: "0 32px",
                borderRadius: 14,
                background: "var(--btn)",
                color: "var(--btntx)",
                fontSize: 16,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Create free account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 1 · gauge */

const BANDS: { from: number; to: number; tone: Band["tone"] }[] = [
  { from: 0, to: 50, tone: "t-red" },
  { from: 50, to: 70, tone: "t-amber" },
  { from: 70, to: 85, tone: "t-blue" },
  { from: 85, to: 100, tone: "t-green" },
];

function ScoreCard({ band, score }: { band: Band; score: number }) {
  const needle = polar(120, 120, 74, atScore(score));
  const cap = polar(120, 120, 96, atScore(score));

  return (
    <div style={{ ...cardStyle, alignItems: "center", textAlign: "center" }}>
      <CardTitle>Resume readiness</CardTitle>

      <div style={{ position: "relative", width: "100%", maxWidth: 260, marginTop: 6 }}>
        <svg viewBox="0 0 240 168" style={{ width: "100%", display: "block" }}>
          {/* The four bands, drawn faint so the live arc reads on top of them. */}
          {BANDS.map((b) => (
            <path
              key={b.tone}
              d={arcPath(120, 120, 96, atScore(b.from) + 1.4, atScore(b.to) - 1.4)}
              fill="none"
              stroke={`var(--${b.tone})`}
              strokeWidth={10}
              strokeLinecap="round"
              opacity={0.18}
            />
          ))}

          {/* Tick marks every ten points. */}
          {Array.from({ length: 11 }, (_, i) => i * 10).map((v) => {
            const a = polar(120, 120, 79, atScore(v));
            const b2 = polar(120, 120, v % 50 === 0 ? 71 : 74, atScore(v));
            return (
              <line
                key={v}
                x1={a.x}
                y1={a.y}
                x2={b2.x}
                y2={b2.y}
                stroke="var(--line2)"
                strokeWidth={v % 50 === 0 ? 2 : 1}
                strokeLinecap="round"
              />
            );
          })}

          <path
            d={arcPath(120, 120, 96, atScore(0), atScore(score))}
            fill="none"
            stroke={`var(--${band.tone})`}
            strokeWidth={10}
            strokeLinecap="round"
            style={{ transition: "d .8s ease" }}
          />
          <circle cx={cap.x} cy={cap.y} r={7} fill="var(--card)" />
          <circle cx={cap.x} cy={cap.y} r={4.5} fill={`var(--${band.tone})`} />

          <line
            x1={120}
            y1={120}
            x2={needle.x}
            y2={needle.y}
            stroke="var(--tx)"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.75}
          />
          <circle cx={120} cy={120} r={7} fill="var(--tx)" opacity={0.75} />
          <circle cx={120} cy={120} r={3} fill="var(--card)" />
        </svg>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 6,
            display: "grid",
            placeItems: "center",
          }}
        >
          <span
            style={{
              padding: "7px 18px",
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              background: `var(--${band.tone}-soft)`,
              color: `var(--${band.tone}-tx)`,
            }}
          >
            {band.label}
          </span>
        </div>
      </div>

      <p
        style={{
          marginTop: 18,
          maxWidth: 230,
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--tx2)",
        }}
      >
        {band.note}
      </p>
      <p style={{ marginTop: "auto", paddingTop: 16, fontSize: 13, color: "var(--tx3)" }}>
        The number behind this is in your free account.
      </p>
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
    <div style={{ ...cardStyle, alignItems: "center" }}>
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
  more,
  total,
}: {
  shown: GuestJob[];
  teased: GuestJob[];
  more: number;
  total: number;
}) {
  const locked = total === 0;

  return (
    <div style={{ ...cardStyle, position: "relative", overflow: "hidden" }}>
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
          {locked ? "20+ jobs" : more > 0 ? `${more} more found` : `${total} found`}
        </span>
      </div>

      <ul
        style={{
          marginTop: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
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
              />
            ))
          : [
              ...shown.map((job) => (
                <JobRow
                  key={job.jobId}
                  score={job.analysis?.matchScore ?? 0}
                  title={job.jobTitle}
                  meta={[job.employerName, job.jobLocation].filter(Boolean).join(" · ")}
                />
              )),
              ...teased.map((job, i) => (
                <JobRow
                  key={job.jobId}
                  score={job.analysis?.matchScore ?? 0}
                  title={job.jobTitle}
                  meta={[job.employerName, job.jobLocation].filter(Boolean).join(" · ")}
                  blur={i === 0 ? 4.5 : 6}
                  dim={i === 0 ? 0.55 : 0.4}
                />
              )),
            ]}
      </ul>

      <p style={{ marginTop: "auto", paddingTop: 16, fontSize: 13, color: "var(--tx3)" }}>
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
}: {
  score: number;
  title: string;
  meta: string;
  blur?: number;
  dim?: number;
}) {
  return (
    <li
      aria-hidden={blur ? true : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 14px",
        borderRadius: 14,
        border: "1px solid var(--line)",
        background: "var(--card2)",
        filter: blur ? `blur(${blur}px)` : undefined,
        opacity: dim,
      }}
    >
      <span
        style={{
          flex: "0 0 auto",
          width: 42,
          height: 42,
          borderRadius: 12,
          display: "grid",
          placeItems: "center",
          background: "var(--acsoft)",
          color: "var(--ac)",
          fontSize: 15.5,
          fontWeight: 600,
        }}
      >
        {score}
      </span>
      <span style={{ minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: 15,
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
            marginTop: 3,
            fontSize: 13,
            color: "var(--tx3)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {meta}
        </span>
      </span>
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
        marginTop: 20,
        borderRadius: 20,
        border: "1px solid var(--line)",
        background: "var(--card)",
        padding: 26,
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
        <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>
          {heading}
        </h3>
        <p style={{ fontSize: 13.5, color: "var(--tx3)" }}>
          Named for free. The detail, and what to do about each one, is behind signup.
        </p>
      </div>

      {gaps.length > 0 ? (
        <ul
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))",
            gap: 14,
          }}
        >
          {gaps.map((gap, i) => {
            const delta = Math.max(0, gap.industryBenchmark - gap.skillLevelScore);
            return (
              <li
                key={gap.category}
                style={{
                  padding: "16px 18px",
                  borderRadius: 14,
                  border: "1px solid var(--line)",
                  background: "var(--card2)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 14.5,
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ color: "var(--tx3)", flex: "0 0 auto" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ minWidth: 0 }}>{gap.category}</span>
                </div>

                <div
                  style={{
                    marginTop: 14,
                    position: "relative",
                    height: 7,
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
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))",
            gap: 14,
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

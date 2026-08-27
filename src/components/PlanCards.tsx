import Image from "next/image";
import { Check } from "./icons";
import SectionLink from "./SectionLink";

export const pricing = {
  free: "₹0",
  topup: "₹299",
  topupNote: "one-time",
  unlimited: "₹599",
  unlimitedNote: "per month",
  pack: "₹299",
};

const freePoints = [
  "Your first application, end to end — enough credits to rewrite, tailor and download it",
  "Whichever template you pick",
  "Skill gaps, career path, and free re-scoring every time you upskill",
  "Matched jobs and internships, scored out of 100",
  "One full AI course for your domain, industry news and podcasts",
];

const topupPoints = [
  "299 credits — no expiry, no subscription",
  "Roughly four job applications, tailored and downloaded",
  "Or one live mock interview, with 99 credits left over",
  "Recharge whenever you run out",
];

const unlimitedPoints = [
  "Everything, no credit counting",
  "Unlimited tailoring, downloads and interviews",
  "Unlimited roadmaps and certificates",
  "Cancel any time",
];

function PlanPoint({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "accent" | "muted" | "inherit";
}) {
  return (
    <li style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.55 }}>
      <span
        style={{
          flex: "0 0 auto",
          marginTop: 1,
          color:
            tone === "accent" ? "var(--ac)" : tone === "muted" ? "var(--tx2)" : undefined,
        }}
      >
        <Check />
      </span>
      <span>{children}</span>
    </li>
  );
}

/**
 * The three plan cards. Shared by the landing page's pricing section and the
 * `plans` block on /pricing, so the prices can never disagree between them.
 */
export default function PlanCards() {
  return (
    <div
      style={{
        marginTop: 48,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
        gap: 22,
        alignItems: "stretch",
      }}
    >
      {/* Free */}
      <div
        className="sd-pad-34"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 34,
          borderRadius: 22,
          border: "1px solid var(--acline)",
          background:
            "linear-gradient(165deg, var(--acsoft), transparent 60%), var(--card)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em" }}>
            Free
          </h3>
          <span
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              background: "var(--ac)",
              color: "#FFFFFF",
              fontSize: 12,
              letterSpacing: "0.08em",
            }}
          >
            START HERE
          </span>
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "baseline",
            gap: 9,
          }}
        >
          <span
            style={{ fontSize: 46, fontWeight: 600, letterSpacing: "-0.03em" }}
          >
            {pricing.free}
          </span>
          <span style={{ fontSize: 15, color: "var(--tx3)" }}>forever</span>
        </div>
        <ul
          style={{
            marginTop: 26,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            flex: "1 1 auto",
          }}
        >
          {freePoints.map((point) => (
            <PlanPoint key={point} tone="accent">
              {point}
            </PlanPoint>
          ))}
        </ul>
        <SectionLink
          to="top"
          style={{
            marginTop: 28,
            height: 52,
            borderRadius: 14,
            background: "var(--btn)",
            color: "var(--btntx)",
            fontSize: 16,
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Upload your resume &mdash; free
        </SectionLink>
      </div>

      {/* Top up */}
      <div
        className="sd-pad-34"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 34,
          borderRadius: 22,
          border: "1px solid var(--line)",
          background: "var(--card)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em" }}>
            Top up
          </h3>
          <Image
            src="/assets/badge-silver.png"
            alt=""
            width={480}
            height={480}
            style={{ width: 42, height: 42, objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "baseline",
            gap: 9,
          }}
        >
          <span
            style={{ fontSize: 46, fontWeight: 600, letterSpacing: "-0.03em" }}
          >
            {pricing.topup}
          </span>
          <span style={{ fontSize: 15, color: "var(--tx3)" }}>
            {pricing.topupNote}
          </span>
        </div>
        <ul
          style={{
            marginTop: 26,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            flex: "1 1 auto",
          }}
        >
          {topupPoints.map((point) => (
            <PlanPoint key={point} tone="muted">
              {point}
            </PlanPoint>
          ))}
        </ul>
        <button
          type="button"
          style={{
            marginTop: 28,
            height: 52,
            borderRadius: 14,
            border: "1px solid var(--line2)",
            background: "transparent",
            color: "var(--tx)",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Buy 299 credits
        </button>
      </div>

      {/* Unlimited */}
      <div
        className="sd-pad-34"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 34,
          borderRadius: 22,
          border: "1px solid transparent",
          background: "linear-gradient(168deg,#7C5DF9,#5B3FD0 62%,#4A32B4)",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.015em" }}>
            Unlimited
          </h3>
          <Image
            src="/assets/badge-crown.png"
            alt=""
            width={480}
            height={480}
            style={{ width: 42, height: 42, objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 10,
            fontSize: 12,
            letterSpacing: "0.10em",
            opacity: 0.85,
          }}
        >
          IF YOU&rsquo;RE APPLYING
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 16,
            display: "flex",
            alignItems: "baseline",
            gap: 9,
          }}
        >
          <span
            style={{ fontSize: 46, fontWeight: 600, letterSpacing: "-0.03em" }}
          >
            {pricing.unlimited}
          </span>
          <span style={{ fontSize: 15, opacity: 0.85 }}>
            {pricing.unlimitedNote}
          </span>
        </div>
        <ul
          style={{
            position: "relative",
            marginTop: 26,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            flex: "1 1 auto",
          }}
        >
          {unlimitedPoints.map((point) => (
            <PlanPoint key={point} tone="inherit">
              {point}
            </PlanPoint>
          ))}
        </ul>
        <button
          type="button"
          style={{
            position: "relative",
            marginTop: 28,
            height: 52,
            borderRadius: 14,
            border: 0,
            background: "#FFFFFF",
            color: "#3A2694",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Go unlimited
        </button>
      </div>
    </div>
  );
}

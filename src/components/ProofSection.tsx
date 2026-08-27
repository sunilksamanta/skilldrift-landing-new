import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";
import { Pill, SectionIntro } from "./SectionBits";

const samples = [
  { href: "/skill-benchmarking", label: "See a real gap report" },
  { href: "/interview-prep", label: "See a real interview scorecard" },
  { href: "/resume-rewrite", label: "A real tailored resume, before and after" },
];

const stats = [
  { value: "40,000+", label: "professionals" },
  { value: "+14 pts", label: "avg. score change in 60 days" },
  { value: "6,200", label: "certificates auto-added" },
  { value: "118,000", label: "tailored versions generated" },
  { value: "63%", label: "report more interview calls" },
];

const strong = (text: string) => <span style={{ color: "var(--tx)" }}>{text}</span>;

const quotes: { avatar: string; body: ReactNode; meta: string }[] = [
  {
    avatar: "av5",
    body: (
      <>
        &ldquo;I went from a {strong("41%")} match on the roles I wanted to{" "}
        {strong("79%")} in {strong("nine weeks")}.{" "}
        {strong("Four interviews in the month after, and an offer from the second one.")}
        &rdquo;
      </>
    ),
    meta: " · Final-year student · Pune",
  },
  {
    avatar: "av6",
    body: (
      <>
        &ldquo;I went from a {strong("38%")} match on product roles to {strong("74%")} in{" "}
        {strong("four months")}.{" "}
        {strong("Moved out of support and into a PM job at the same company.")}&rdquo;
      </>
    ),
    meta: " · Career switcher · Bengaluru",
  },
  {
    avatar: "av7",
    body: (
      <>
        &ldquo;I went from a {strong("55%")} match on director roles to {strong("86%")} in{" "}
        {strong("six months")}.{" "}
        {strong("Two board-level shortlists I would not have reached before.")}&rdquo;
      </>
    ),
    meta: " · Senior leader · Gurugram",
  },
];

export default function ProofSection() {
  return (
    <section id="proof" className="sect">
      <div className="wrap">
        <Pill>Proof</Pill>
        <SectionIntro
          align="start"
          copyPadTop={8}
          heading="Don&rsquo;t take our word for it. Look at the output."
          copy="No signup, no email. Open a real report and judge the quality yourself."
        />

        <div
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))",
            gap: 18,
          }}
        >
          {samples.map((sample) => (
            <Link
              key={sample.label}
              href={sample.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "24px 26px",
                borderRadius: 16,
                border: "1px solid var(--line)",
                background: "var(--card)",
                color: "inherit",
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1.45 }}>{sample.label}</span>
              <span
                style={{
                  flex: "0 0 auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: "var(--ac)",
                  whiteSpace: "nowrap",
                }}
              >
                Open sample
                <ArrowRight size={15} strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>

        <div
          style={{
            marginTop: 44,
            display: "flex",
            flexWrap: "wrap",
            border: "1px solid var(--line)",
            borderRadius: 18,
            overflow: "hidden",
            background: "var(--bg2)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="sd-stat"
              style={{
                flex: "1 1 190px",
                padding: 28,
                borderLeft: i === 0 ? undefined : "1px solid var(--line)",
                background: "var(--bg2)",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em" }}>
                {stat.value}
              </div>
              <div style={{ marginTop: 6, fontSize: 14, color: "var(--tx3)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
            gap: 20,
          }}
        >
          {quotes.map((quote) => (
            <figure
              key={quote.avatar}
              style={{
                position: "relative",
                overflow: "hidden",
                padding: 30,
                borderRadius: 20,
                border: "1px solid var(--line)",
                background: "var(--card)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: -90,
                  bottom: -90,
                  width: 260,
                  height: 260,
                  background:
                    "radial-gradient(circle,rgba(124,93,249,.30),transparent 66%)",
                  pointerEvents: "none",
                }}
              />
              <blockquote
                style={{ position: "relative", fontSize: 17, lineHeight: 1.6 }}
              >
                {quote.body}
              </blockquote>
              <figcaption
                style={{
                  position: "relative",
                  marginTop: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Image
                  src={`/assets/${quote.avatar}.jpg`}
                  alt=""
                  width={72}
                  height={72}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                    objectFit: "cover",
                  }}
                />
                <span style={{ fontSize: 14 }}>
                  <span style={{ color: "var(--tx)" }}>[Name]</span>
                  <span style={{ color: "var(--tx3)" }}>{quote.meta}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

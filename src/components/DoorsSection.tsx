"use client";

import { useEffect, useState } from "react";
import TrackedLink from "./TrackedLink";
import { homeCta } from "@/lib/cta";
import { trackIntentSelected } from "@/lib/analytics/cta";

const doors = [
  {
    title: "Land my first job",
    blurb: "I am starting out and want a proper role in my field.",
    heading: "You have no track record yet. Let us build one.",
    goals: [
      "Get an internship",
      "Land my first full-time job",
      "Clear my placement interviews",
      "Build my skills before I start applying",
    ],
    steps: [
      {
        title: "Pick internship or full-time",
        body: "Your job board follows the goal: internships first, or full-time roles only, all for under one year of experience.",
      },
      {
        title: "See what already counts",
        body: "Your projects and coursework are read as skills, and every opening is scored out of 100 with the reasons shown.",
      },
      {
        title: "Close the gaps",
        body: "Start with a free AI course for your field, such as AI for Field Sales. SkillDrift then suggests courses for what your jobs ask for. Each certificate goes into your resume and your scores move.",
      },
      {
        title: "Apply and practise",
        body: "Tailor your resume to each job, ask for a referral with a short note, and practise the interview out loud, scored out of 10.",
      },
    ],
  },
  {
    title: "Move to a new job",
    blurb: "I want to move, in my field or into a new one.",
    heading: "You have the experience. Now make sure it gets read.",
    goals: [
      "Find a new job in my field",
      "Get more interview calls from my applications",
      "Prepare for interviews I have coming up",
    ],
    steps: [
      {
        title: "Pick up to five roles",
        body: "Choose the roles you want, or see roles near yours that have openings. Moving field? See which skills transfer.",
      },
      {
        title: "Only real, open jobs",
        body: "Every job has a trusted apply link and is checked before you apply. A closed job is never charged.",
      },
      {
        title: "Your experience counts",
        body: "Tap I have this to add one line of proof, and that requirement counts as met. Rewrite your resume around what you achieved.",
      },
      {
        title: "Get the call, then the offer",
        body: "Tailor each application, ask for a referral and practise the interview. When you get the job, tap I got the role.",
      },
    ],
  },
  {
    title: "Get promoted where I am",
    blurb: "I want the next level up, in the job I already have.",
    heading: "Know exactly what the next level needs.",
    goals: ["Get better at my current job"],
    steps: [
      {
        title: "See the level above",
        body: "Benchmark yourself against the role above yours, with each gap named and the skills you already have shown.",
      },
      {
        title: "Close the gaps at your pace",
        body: "Learning sized to your hours. Every finished step, and every month in the role, adds to your scores.",
      },
      {
        title: "Log a win each week",
        body: "Keep the wins you choose on your resume, ready for the month your review comes round.",
      },
      {
        title: "Walk into your review ready",
        body: "Before your review, get a draft self-review built from your wins, and see how ready you are for the next level.",
      },
    ],
  },
];

export default function DoorsSection() {
  const [intent, setIntent] = useState(0);
  const active = doors[intent];

  // Follows the hero goal picker (same three goals, same order).
  useEffect(() => {
    const on = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      if (typeof i === "number" && doors[i]) setIntent(i);
    };
    window.addEventListener("sd:goal", on);
    return () => window.removeEventListener("sd:goal", on);
  }, []);

  return (
    <section id="doors" className="sect--tight sect--alt">
      <div className="wrap">
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12.5, letterSpacing: "0.14em", color: "var(--ac)" }}>
            PICK YOUR STARTING POINT
          </div>
          <h2
            style={{
              marginTop: 16,
              fontSize: "clamp(30px,3.3vw,46px)",
              lineHeight: 1.13,
              fontWeight: 600,
              letterSpacing: "-0.025em",
            }}
          >
            Wherever you start, the first step is the same.
          </h2>
          <p
            style={{
              margin: "14px auto 0",
              maxWidth: 520,
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--tx2)",
            }}
          >
            Pick yours to see what SkillDrift does for it.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Pick your starting point"
          style={{
            marginTop: 44,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {doors.map((door, i) => {
            const on = intent === i;
            return (
              <button
                key={door.title}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="door-panel"
                onClick={() => {
                  // Reported before the panel swaps, so the event names the
                  // card that was actually pressed rather than the one that
                  // ends up selected. The same call writes `sd_anon_intent`,
                  // which is what carries the choice onto every later event —
                  // the upload above all — so the two can never disagree.
                  trackIntentSelected(door.title);
                  setIntent(i);
                  // The product screen below follows the same goal.
                  window.dispatchEvent(new CustomEvent("sd:goal", { detail: i }));
                }}
                style={{
                  textAlign: "left",
                  color: "var(--tx)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  justifyContent: "flex-start",
                  minHeight: 44,
                  padding: "var(--door-pad, 24px 26px)",
                  borderRadius: 16,
                  transition: "border-color .2s, background .2s",
                  border: on ? "1px solid var(--ac)" : "1px solid var(--line)",
                  background: on
                    ? "linear-gradient(160deg, var(--acsoft), transparent 78%), var(--card)"
                    : "var(--card)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 19,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {door.title}
                </span>
                <span
                  className="sd-phone-hide"
                  style={{
                    display: "block",
                    marginTop: 8,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "var(--tx2)",
                  }}
                >
                  {door.blurb}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="door-panel"
          role="tabpanel"
          className="sd-pad-34"
          style={{
            marginTop: 18,
            padding: "38px 40px",
            borderRadius: 22,
            border: "1px solid var(--line)",
            background: "var(--card)",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(22px,2.2vw,30px)",
              lineHeight: 1.2,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {active.heading}
          </h3>
          <ol className="sd-door-steps" aria-label={`How SkillDrift works when you want to ${active.title.toLowerCase()}`}>
            {active.steps.map((step, i) => (
              <li key={step.title}>
                <span className="sd-door-num">{i + 1}</span>
                <span style={{ display: "block", marginTop: 14, fontSize: 16.5, fontWeight: 600, letterSpacing: "-0.01em" }}>
                  {step.title}
                </span>
                <span style={{ display: "block", marginTop: 6, fontSize: 14.5, lineHeight: 1.6, color: "var(--tx2)" }}>
                  {step.body}
                </span>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13.5, color: "var(--tx3)", marginRight: 4 }}>
              {active.goals.length > 1 ? "Goals you can pick:" : "The goal you pick:"}
            </span>
            {active.goals.map((g) => (
              <span key={g} className="sd-door-goal">
                {g}
              </span>
            ))}
          </div>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <TrackedLink
              href={homeCta("doors_upload")}
              section="intent_cards"
              label="upload_free"
              // The panel's own door, which is the default one until the
              // visitor picks. The cookie is still empty in that case, so this
              // is more accurate here than the value trackCta would read.
              extra={{ intent_door: active.title }}
              style={{
                minHeight: 52,
                padding: "0 30px",
                borderRadius: 14,
                background: "var(--btn)",
                color: "var(--btntx)",
                fontSize: 16,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Upload your resume, free
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

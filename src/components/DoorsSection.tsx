"use client";

import { useState } from "react";
import { Check } from "./icons";
import { homeCta } from "@/lib/cta";
import { setIntent as rememberIntent } from "@/lib/anon-session";

const doors = [
  {
    title: "Land my first job",
    blurb: "I am starting out and want a proper role in my field.",
    heading: "You have no track record yet. Let us build one.",
    points: [
      "See which of your projects and coursework actually count as skills, scored against an entry level role.",
      "Internships and openings for under one year of experience, ranked out of 100.",
      "Finish your free AI course and the certificate writes itself into your resume.",
    ],
  },
  {
    title: "Move to a new job",
    blurb: "I want to move, in my field or into a new one.",
    heading: "You have the experience. Now make sure it gets read.",
    points: [
      "See how you match roles at other companies, out of 100, before you spend an application.",
      "Rewrite your resume around what you achieved, then tailor it to each posting.",
      "Moving into something new? See which skills transfer, and get a roadmap for the ones that do not.",
    ],
  },
  {
    title: "Get promoted where I am",
    blurb: "I want the next level up, in the job I already have.",
    heading: "Know exactly what the next level needs.",
    points: [
      "Benchmark yourself against the level above you, not against strangers.",
      "Your score re-scores itself every time you close a gap, at no cost.",
      "Practise the panel with a live voice interview and get a hire verdict out of 10.",
    ],
  },
];

export default function DoorsSection() {
  const [intent, setIntent] = useState(0);
  const active = doors[intent];

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
            Where are you right now?
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
            Three different journeys. Same first step.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Where are you right now?"
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
                  setIntent(i);
                  // Remembered for the anonymous funnel: every later event,
                  // including the upload, reports which door they picked.
                  rememberIntent(door.title);
                }}
                style={{
                  textAlign: "left",
                  color: "var(--tx)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  justifyContent: "flex-start",
                  minHeight: 44,
                  padding: "24px 26px",
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
          <div
            style={{
              marginTop: 30,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))",
              gap: 28,
            }}
          >
            {active.points.map((point) => (
              <div key={point} style={{ display: "flex", gap: 12 }}>
                <span style={{ flex: "0 0 auto", color: "var(--ac)", marginTop: 1 }}>
                  <Check />
                </span>
                <span style={{ display: "block", fontSize: 15.5, lineHeight: 1.6 }}>
                  {point}
                </span>
              </div>
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
            <a
              href={homeCta("doors_upload")}
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

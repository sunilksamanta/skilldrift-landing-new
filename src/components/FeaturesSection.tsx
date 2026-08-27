"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "./icons";
import { Pill, SectionIntro } from "./SectionBits";

const features = [
  {
    n: "01",
    kicker: "Resume tailoring",
    title: "Beat the bots. Land the interview.",
    body: "Generate an ATS-optimised version for every job you apply to. Your master copy stays untouched. Every figure on your tailored resume is one you gave us — nothing is generated for you.",
    cta: "See resume tailoring",
    href: "/resume-tailoring",
    image: "/assets/tailor-resume.png",
    alt: "Side-by-side comparison of an original resume and the AI-tailored version for a Senior Product Designer role",
  },
  {
    n: "02",
    kicker: "Interview prep",
    title: "Practise until it’s boring.",
    body: "Voice, recorded and text mock interviews, with a scorecard telling you where you actually lost points.",
    cta: "See interview prep",
    href: "/interview-prep",
    image: "/assets/interview.png",
    alt: "A SkillDrift mock interview in progress with its scorecard",
  },
  {
    n: "03",
    kicker: "Job fit analysis",
    title: "Know your odds before you apply.",
    body: "Paste any job description — LinkedIn, Indeed, anywhere — and see your match before you hit submit.",
    cta: "See job fit analysis",
    href: "/job-match",
    image: "/assets/job-match.png",
    alt: "A pasted job description scored against a resume, showing the match out of 100",
  },
  {
    n: "04",
    kicker: "Job matching",
    title: "Stop scrolling job boards.",
    body: "Roles ranked by how well you match, out of 100. Includes internships and entry-level openings.",
    cta: "See job matching",
    href: "/jobs",
    image: "/assets/jobs.png",
    alt: "A list of matched roles, each ranked out of 100",
  },
  {
    n: "05",
    kicker: "Learning",
    title: "Learn in sprints, not semesters.",
    body: "Focused micro-lessons on the exact skills your gap report flagged — nothing you already know.",
    cta: "See learning sprints",
    href: "/learning-sprints",
    image: "/assets/learning.png",
    alt: "A SkillDrift learning sprint with its lessons and progress",
  },
  {
    n: "06",
    kicker: "Benchmarking",
    title: "See how you stack up.",
    body: "Your skills against industry standards and against your peers, with the blind spots named.",
    cta: "See benchmarking",
    href: "/skill-benchmarking",
    image: "/assets/benchmarking.png",
    alt: "Skills benchmarked against industry standards and peers, scored out of 100",
  },
];

export default function FeaturesSection() {
  const [open, setOpen] = useState(0);
  const active = features[open];

  return (
    <section id="features" className="sect sect--alt">
      <div className="wrap">
        <Pill>Everything in the loop</Pill>
        <SectionIntro
          align="start"
          heading="Six powerful tools, seamlessly connected in one unified system."
          copy="Every tool feeds into one connected profile, one growing score, and one resume that gets stronger with every skill you build. Each links to its own page."
        />

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(400px,100%),1fr))",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {features.map((feature, i) => {
              const on = open === i;
              return (
                <div
                  key={feature.n}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    padding: "22px 0 22px 24px",
                    borderLeft: on
                      ? "2px solid var(--ac)"
                      : "1px solid var(--line2)",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`feature-panel-${feature.n}`}
                    onClick={() => setOpen(i)}
                    style={{
                      textAlign: "left",
                      color: "var(--tx)",
                      background: "transparent",
                      border: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        gap: 12,
                        fontSize: 14,
                        color: "var(--tx3)",
                      }}
                    >
                      <span>{feature.n}</span>
                      <span style={{ color: "var(--ac)" }}>{feature.kicker}</span>
                    </span>
                    <span
                      style={{
                        display: "block",
                        marginTop: 10,
                        fontSize: 22,
                        fontWeight: 600,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {feature.title}
                    </span>
                  </button>

                  <div
                    id={`feature-panel-${feature.n}`}
                    style={{ display: on ? "block" : "none" }}
                  >
                    <p
                      style={{
                        paddingTop: 16,
                        fontSize: 15,
                        lineHeight: 1.62,
                        color: "var(--tx2)",
                      }}
                    >
                      {feature.body}
                    </p>
                    <Link
                      href={feature.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 9,
                        marginTop: 20,
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--tx)",
                      }}
                    >
                      {feature.cta}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* The artwork already carries the purple field and grid, so it needs
              no frame of its own — only a matching radius. */}
          <Link
            href={active.href}
            aria-label={active.cta}
            style={{
              display: "block",
              position: "relative",
              width: "100%",
              aspectRatio: "1800 / 1290",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 30px 70px rgba(20,10,60,.28)",
            }}
          >
            <Image
              key={active.image}
              src={active.image}
              alt={active.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

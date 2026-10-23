"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "./icons";
import ScoreRing from "./ScoreRing";
import { Pill, SectionIntro } from "./SectionBits";
import TrackedLink from "./TrackedLink";

/*
 * The closed loop, shown on one person instead of described. A highlight
 * travels round the ring and the centre shows what each step produced: the
 * job score rising, an interview score, an application, the hire, then the
 * next role. The panel beside it shows the real screen for that step.
 *
 * Auto-plays only while in view, pauses on hover or keyboard focus, and a
 * click jumps to a step. Reduced-motion visitors get no auto-play.
 */

type Step = {
  key: string;
  title: string;
  body: string;
  ring: number | null;
  big: string;
  small: string;
  shot: string;
  alt: string;
  href: string;
  link: string;
};

const steps: Step[] = [
  {
    key: "upload",
    title: "Upload",
    body: "SkillDrift reads your skills straight from your resume and compares them with the role. No forms to fill.",
    ring: 0,
    big: "Read",
    small: "Your skills, compared with the role",
    shot: "/assets/shots/m-career-change.png",
    alt: "An accountant's skills read from their resume and compared with a Financial Analyst role: what carries over and what does not yet",
    href: "/skill-benchmarking",
    link: "How your skills are read",
  },
  {
    key: "match",
    title: "Match",
    body: "Every job is scored out of 100 against what you have, with each missing skill named. Only open jobs with a trusted apply link.",
    ring: 63,
    big: "63",
    small: "Job match out of 100",
    shot: "/assets/shots/m-job-match-analysis.png",
    alt: "A tax manager job scored 78 out of 100 for an experienced accountant, with what they have and what to close",
    href: "/job-match",
    link: "How jobs are scored",
  },
  {
    key: "close",
    title: "Close",
    body: "Each gap becomes a roadmap built for you, plus a free AI course for your field. You see how much it moves your scores before you start.",
    ring: 70,
    big: "70",
    small: "+7 after one roadmap",
    shot: "/assets/shots/m-learning-roadmaps.png",
    alt: "A learning roadmap in SkillDrift for advanced reliability and asset management, four weeks at an advanced level",
    href: "/learning-sprints",
    link: "How roadmaps work",
  },
  {
    key: "prove",
    title: "Prove",
    body: "The certificate goes into your resume the moment you finish. Mock interviews in text or voice give you a score out of 10 and your chance of being hired.",
    ring: 68,
    big: "6.8",
    small: "Interview score out of 10",
    shot: "/assets/shots/m-interview-report.png",
    alt: "A SkillDrift interview report for a paid media executive role: 6.8 out of 10, a medium hire chance and the answers to work on",
    href: "/interview-prep",
    link: "How interviews are scored",
  },
  {
    key: "apply",
    title: "Apply",
    body: "The Apply Kit tailors your resume to the job, writes a cover note and helps you ask for a referral, then sends you to the apply page.",
    ring: 70,
    big: "Applied",
    small: "Tailored resume and a referral note",
    shot: "/assets/shots/m-tailor-apply-kit.png",
    alt: "The SkillDrift Apply Kit: improve your resume, tailor it to the job, download it, then apply on the company site",
    href: "/resume-tailoring",
    link: "How the Apply Kit works",
  },
  {
    key: "grow",
    title: "Grow",
    body: "Got the job? Your time in the role counts, your wins go onto your resume, and SkillDrift plans the next role. Then the loop starts again.",
    ring: 100,
    big: "Hired",
    small: "Next role on the plan. Round two.",
    shot: "/assets/shots/m-home-product-grow.png",
    alt: "SkillDrift for someone growing in their role: 61% ready, the top gap and the next role on the plan",
    href: "/career-progression",
    link: "How SkillDrift plans your next role",
  },
];

/* Node centres on a 600 x 600 ring of radius 230, clockwise from the top. */
const nodes = steps.map((_, i) => {
  const a = (-90 + i * 60) * (Math.PI / 180);
  return { x: 300 + 230 * Math.cos(a), y: 300 + 230 * Math.sin(a) };
});
const C = 2 * Math.PI * 230;

export default function LoopSection() {
  const host = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const [holdUntil, setHoldUntil] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const el = host.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (still || !visible || paused) return;
    const held = holdUntil - Date.now();
    const t = setTimeout(() => setI((n) => (n + 1) % steps.length), held > 0 ? held : 3400);
    return () => clearTimeout(t);
  }, [i, visible, paused, still, holdUntil]);

  const s = steps[i];
  const pick = (n: number) => {
    setI(n);
    setHoldUntil(Date.now() + 8000);
  };

  return (
    <section id="loop" className="sect">
      <div className="wrap">
        <Pill>The closed loop</Pill>
        <SectionIntro
          heading="Most tools hand you one piece. SkillDrift closes the loop."
          copy={
            <>
              A course site stops when the course ends. A job board stops at the listing. SkillDrift
              carries every step into the next, so each one raises your scores, and it keeps going
              after you are hired.{" "}
              <Link
                href="/closed-loop-career-development"
                style={{ textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                What is closed loop career development?
              </Link>
            </>
          }
        />

        <div
          ref={host}
          className="sd-cl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="sd-cl-ring">
            <svg viewBox="0 0 600 600" aria-hidden="true" className="sd-cl-svg">
              <defs>
                <linearGradient id="sdClArc" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#9B82FF" />
                  <stop offset="100%" stopColor="#5B3FD0" />
                </linearGradient>
                <radialGradient id="sdClCore" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(124,93,249,.24)" />
                  <stop offset="100%" stopColor="rgba(124,93,249,0)" />
                </radialGradient>
              </defs>
              <circle cx="300" cy="300" r="150" fill="url(#sdClCore)" />
              <circle
                cx="300"
                cy="300"
                r="230"
                fill="none"
                stroke="rgba(124,93,249,.35)"
                strokeWidth="2"
                strokeDasharray="6 7"
              />
              <circle
                className="sd-cl-arc"
                cx="300"
                cy="300"
                r="230"
                fill="none"
                stroke="url(#sdClArc)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - i / steps.length)}
                transform="rotate(-90 300 300)"
              />
            </svg>

            <div className="sd-cl-core" aria-live="polite">
              <span className="sd-cl-example">Example</span>
              <div className="sd-cl-score">
                {s.ring !== null && (
                  <span className="sd-cl-ringwrap" aria-hidden="true">
                    <ScoreRing value={s.ring} size={132} stroke={9} label={false} />
                  </span>
                )}
                <span className="sd-cl-big" data-word={/^[0-9.]+$/.test(s.big) ? "false" : "true"}>
                  {s.big}
                </span>
              </div>
              <div className="sd-cl-small">{s.small}</div>
            </div>

            {steps.map((st, n) => (
              <button
                key={st.key}
                type="button"
                className="sd-cl-node"
                data-state={n === i ? "on" : n < i ? "done" : "next"}
                style={{ left: `${(nodes[n].x / 600) * 100}%`, top: `${(nodes[n].y / 600) * 100}%` }}
                aria-pressed={n === i}
                aria-label={`Step ${n + 1}: ${st.title}`}
                onClick={() => pick(n)}
              >
                <span className="sd-cl-num">{n < i ? <Check size={14} strokeWidth={2.6} /> : n + 1}</span>
                <span className="sd-cl-label">{st.title}</span>
              </button>
            ))}
          </div>

          <div className="sd-cl-panel">
            <div className="sd-cl-tabs" role="tablist" aria-label="The six steps">
              {steps.map((st, n) => (
                <button
                  key={st.key}
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  className="sd-cl-tab"
                  data-on={n === i ? "true" : "false"}
                  onClick={() => pick(n)}
                >
                  {n + 1}. {st.title}
                </button>
              ))}
            </div>
            <div key={s.key} className="sd-cl-body">
              <div className="sd-cl-step">
                Step {i + 1} of {steps.length}
              </div>
              <h3 className="sd-cl-title">{s.title}</h3>
              <p className="sd-cl-text">{s.body}</p>
              <Link href={s.href} className="sd-cl-shot" aria-label={`${s.link}: ${s.alt}`}>
                <Image src={s.shot} alt={s.alt} width={1080} height={1350} sizes="(max-width: 760px) 80vw, 300px" />
              </Link>
              <Link href={s.href} className="sd-cl-more">
                {s.link}
                <ArrowRight />
              </Link>
            </div>
            <div className="sd-cl-progress" aria-hidden="true">
              <span key={`${i}-${paused}-${still}`} data-run={!still && visible && !paused ? "true" : "false"} />
            </div>
          </div>
        </div>

        <div className="sd-cl-foot">
          <ul className="sd-cl-stops">
            <li>
              Course sites stop at <strong>Close</strong>.
            </li>
            <li>
              Job boards stop at <strong>Match</strong>.
            </li>
            <li>
              Resume tools stop at <strong>Apply</strong>.
            </li>
            <li className="sd-cl-us">
              SkillDrift keeps going after the hire.
            </li>
          </ul>
          <TrackedLink href="#upload" section="closed_loop" label="start_step_1" className="sd-cl-cta">
            Start step 1: upload your resume
            <ArrowRight />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

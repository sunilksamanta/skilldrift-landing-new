"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "./icons";
import ScoreRing, { RingMark } from "./ScoreRing";
import TrackedLink from "./TrackedLink";

/*
 * The one thing a still screenshot cannot show and no competitor shows: a
 * finished step moving the scores. A short example plays when the band comes
 * into view: a course completes, the certificate is written into the resume,
 * and the job scores re-score. Built in code (no video file), so it is light,
 * crisp on every screen and readable by crawlers. Reduced-motion visitors get
 * the finished state.
 *
 * Replaces the old "Your resume stops going stale" section and keeps its id
 * (#live-resume) and its three claims, so links into it still land.
 */

const steps = [
  { title: "You finish a course", body: "A course for the skill your jobs ask about, sized to the hours you have." },
  { title: "The certificate goes into your resume", body: "Written in the moment you finish. No re-uploading, no re-formatting." },
  { title: "Every job you track re-scores", body: "Free, every time. You see which roles just came within reach." },
];

const jobs = [
  { role: "Intern, Software Development", co: "Lumen Grid", from: 74, to: 81, req: ["9 of 14", "10 of 14"] },
  { role: "Backend Developer, Graduate", co: "Northwind", from: 63, to: 70, req: ["6 of 11", "7 of 11"] },
];

function useTween(target: number, ms = 1000) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      setV(a + (target - a) * e);
      if (k < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function JobRow({ job, moved }: { job: (typeof jobs)[number]; moved: boolean }) {
  const v = useTween(moved ? job.to : job.from);
  return (
    <div className="sd-loop-job">
      <ScoreRing value={v} size={54} stroke={5} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: "#14102b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {job.role}
        </div>
        <div style={{ marginTop: 3, fontSize: 12.5, color: "#6b6880" }}>
          {job.co} &middot; {moved ? job.req[1] : job.req[0]} requirements met
        </div>
      </div>
      <span className="sd-loop-delta" data-on={moved ? "true" : "false"}>
        +{job.to - job.from}
      </span>
    </div>
  );
}

export default function ScoreLoopSection() {
  const host = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); // 0 in progress, 1 done, 2 on resume, 3 scores moved
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  // A step the visitor clicked holds the animation on that step for a while.
  const [holdUntil, setHoldUntil] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setStep(3);
      return;
    }
    const el = host.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (still || !visible) return;
    const held = holdUntil - Date.now();
    const wait = held > 0 ? held : step === 3 ? 3600 : step === 0 ? 1400 : 1500;
    const t = setTimeout(() => setStep((s) => (s + 1) % 4), wait);
    return () => clearTimeout(t);
  }, [step, visible, still, holdUntil]);

  const progress = step === 0 ? 82 : 100;
  const active = step === 0 ? 0 : step - 1;

  return (
    <section id="live-resume" className="sect sect--deep">
      <div className="wrap">
        <div className="sd-loop-grid">
          <div>
            <span className="sd-pill-deep">
              <RingMark />
              Nobody else does this
            </span>
            <h2
              style={{
                marginTop: 26,
                fontSize: "clamp(32px,3.6vw,52px)",
                lineHeight: 1.08,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                color: "#fff",
              }}
            >
              Finish a step. Watch your scores move.
            </h2>
            <p style={{ marginTop: 18, fontSize: 16.5, lineHeight: 1.62, color: "rgba(255,255,255,.78)", maxWidth: 520 }}>
              Your resume, your courses and your jobs live in one record. So what you finish
              shows up everywhere at once, and your resume never goes stale.
            </p>
            <ol style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0 }}>
              {steps.map((s, i) => {
                const on = step > 0 && i <= active;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      className="sd-loop-step"
                      data-on={on ? "true" : "false"}
                      aria-pressed={step === i + 1}
                      onClick={() => {
                        // Show this step in the example, then carry on from it.
                        setStep(i + 1);
                        setHoldUntil(Date.now() + 5000);
                      }}
                    >
                      <span className="sd-loop-num">{on ? <Check size={15} strokeWidth={2.4} /> : i + 1}</span>
                      <span>
                        <span style={{ display: "block", fontSize: 16, fontWeight: 600, color: "#fff" }}>{s.title}</span>
                        <span style={{ display: "block", marginTop: 4, fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,.7)" }}>
                          {s.body}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p style={{ marginTop: 20, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.7)", maxWidth: 520 }}>
              Share the certificate to LinkedIn in one click and the 50 credits it cost to issue
              come straight back.
            </p>
            <TrackedLink
              href="/how-it-works"
              section="live_resume"
              label="how_it_works"
              style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 16, fontWeight: 500, color: "#fff" }}
            >
              See what moves your scores
              <ArrowRight />
            </TrackedLink>
          </div>

          <div ref={host} className="sd-loop-stage" aria-label="Example: a finished course moves two job scores">
            <span className="sd-loop-example">Example</span>
            {/* The example looks like the product, so a click goes to what moves the scores. */}
            <TrackedLink
              href="/how-it-works#what-moves"
              section="live_resume"
              label="example_stage"
              ariaLabel="See what moves your scores"
              className="sd-loop-stagelink"
            >
              <span className="sd-loop-stagehint">See what moves your scores &rarr;</span>
            </TrackedLink>

            <div className="sd-loop-card">
              <div className="sd-loop-kicker">LEARNING ROADMAP</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 8 }}>
                <div style={{ fontSize: 15.5, fontWeight: 600, color: "#14102b" }}>Django backend development</div>
                <span className="sd-loop-badge" data-on={step >= 1 ? "true" : "false"}>
                  {step >= 1 ? "Completed" : "Lesson 9 of 11"}
                </span>
              </div>
              <div className="sd-loop-bar">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="sd-loop-card">
              <div className="sd-loop-kicker">YOUR RESUME &middot; CERTIFICATIONS</div>
              <div style={{ marginTop: 10, fontSize: 13.5, color: "#6b6880" }}>SQL for data work, SkillDrift, Aug 2026</div>
              <div className="sd-loop-newline" data-on={step >= 2 ? "true" : "false"}>
                <Check size={14} strokeWidth={2.4} />
                Django backend development, SkillDrift, Oct 2026
              </div>
            </div>

            <div className="sd-loop-card">
              <div className="sd-loop-kicker">JOBS YOU TRACK &middot; SCORED OUT OF 100</div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                {jobs.map((j) => (
                  <JobRow key={j.role} job={j} moved={step >= 3} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

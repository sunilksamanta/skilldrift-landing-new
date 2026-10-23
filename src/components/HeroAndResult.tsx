"use client";

import Image from "next/image";
import { ArrowRight } from "./icons";
import TrackedLink from "./TrackedLink";
import GuestResultSection from "./GuestResultSection";
import { UploadCard } from "./ResumeUploadCard";
import HeroGoalPicker from "./HeroGoalPicker";
import ScoreRing from "./ScoreRing";
import { useGuestAnalysis } from "@/hooks/useGuestAnalysis";

/* av2 is used by a testimonial below, so the stack borrows av9 instead. */
const avatars = ["av1", "av9", "av3", "av4"];

export default function HeroAndResult() {
  const guest = useGuestAnalysis();
  const done = guest.phase === "ready";

  return (
    <>
      <section
        id="top"
        style={{
          position: "relative",
          padding: done ? "36px 0 0" : "64px 0 84px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-140px -10% auto auto",
            width: 1100,
            height: 900,
            pointerEvents: "none",
            background:
              "radial-gradient(58% 46% at 76% 16%, rgba(255,255,255,.62) 0%, rgba(168,146,255,.42) 26%, rgba(96,73,192,.20) 52%, transparent 74%)",
            filter: "blur(4px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -320,
            right: -120,
            width: 1500,
            height: 1300,
            pointerEvents: "none",
            background:
              "linear-gradient(206deg, rgba(255,255,255,.95) 0%, rgba(255,255,255,.55) 7%, rgba(150,124,255,.30) 16%, rgba(96,73,192,.13) 30%, transparent 46%)",
            transform: "rotate(-2deg)",
            opacity: 0.9,
          }}
        />

        <div className="wrap" style={{ position: "relative" }}>
          <div
            className={done ? undefined : "sd-hero-grid"}
            style={
              done
                ? { display: "grid", gridTemplateColumns: "minmax(0,1fr)" }
                : {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(min(440px,100%),1fr))",
                    gap: 96,
                    alignItems: "center",
                  }
            }
          >
            {!done && (
              <div>
                <h1
                  style={{
                    maxWidth: 980,
                    fontSize: "clamp(38px,4.6vw,66px)",
                    lineHeight: 1.06,
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                    color: "var(--tx)",
                  }}
                >
                  Get the job you want. Then grow into the next one.
                </h1>
                <p
                  style={{
                    marginTop: 26,
                    maxWidth: 660,
                    fontSize: 17,
                    lineHeight: 1.62,
                    color: "var(--tx2)",
                  }}
                >
                  SkillDrift finds jobs and internships scored out of 100 for you, plans
                  what to learn and gets you ready to apply and interview. Every step you
                  finish raises your scores, and after you get the role it keeps going.
                </p>
                <HeroGoalPicker />
                <div
                  style={{
                    marginTop: 30,
                    display: "flex",
                    alignItems: "center",
                    gap: 26,
                    flexWrap: "wrap",
                  }}
                >
                  <TrackedLink
                    href="/how-it-works"
                    section="hero"
                    label="how_it_works"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--tx)",
                    }}
                  >
                    See how it works
                    <ArrowRight />
                  </TrackedLink>
                  <span style={{ fontSize: 14, color: "var(--tx3)" }}>
                    No account required to see your score &middot; first application free
                  </span>
                </div>
                <p
                  style={{
                    marginTop: 18,
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--tx)",
                    paddingLeft: 14,
                    borderLeft: "2px solid var(--ac)",
                  }}
                >
                  A chatbot reads your resume once. SkillDrift remembers every step.
                </p>

                <div
                  style={{
                    marginTop: 34,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                    fontSize: 14,
                    color: "var(--tx2)",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {avatars.map((name, i) => (
                      <Image
                        key={name}
                        src={`/assets/${name}.jpg`}
                        alt=""
                        width={72}
                        height={72}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 999,
                          objectFit: "cover",
                          border: "2px solid var(--bg)",
                          marginLeft: i === 0 ? 0 : -11,
                        }}
                      />
                    ))}
                  </span>
                  <span>40,000+ professionals</span>
                  <span style={{ width: 1, height: 14, background: "var(--line2)" }} />
                  <span className="sd-store-badges">
                    <TrackedLink
                      href="https://apps.apple.com/in/app/skilldrift/id6749856149"
                      section="hero"
                      label="app_store"
                      newTab
                      style={{ display: "block" }}
                    >
                      <Image src="/assets/app_store.png" alt="Download on the App Store" width={944} height={328} />
                    </TrackedLink>
                    <TrackedLink
                      href="https://play.google.com/store/apps/details?id=com.skilldrift.app"
                      section="hero"
                      label="play_store"
                      newTab
                      style={{ display: "block" }}
                    >
                      <Image src="/assets/google_play.png" alt="Get it on Google Play" width={944} height={328} />
                    </TrackedLink>
                  </span>
                  <span style={{ flexBasis: "100%" }}>Gaps &amp; job matches always free</span>
                </div>
              </div>
            )}

            {!done && (
              <div id="upload" style={{ position: "relative" }}>
                <TrackedLink
                  href="/job-match"
                  section="hero"
                  label="example_result"
                  ariaLabel="Example result: Sales Executive, 77 out of 100. See how job scores work"
                  className="sd-hero-peek"
                >
                  <ScoreRing value={77} size={46} stroke={4.5} transition={false} />
                  <div>
                    <div style={{ fontSize: 10.5, letterSpacing: "0.12em", fontWeight: 600, color: "var(--ac)" }}>
                      EXAMPLE &middot; SALES EXECUTIVE
                    </div>
                    <div style={{ marginTop: 3, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--tx2)" }}>
                      Good fit
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#0f7a4b",
                          background: "#e3f6ec",
                          whiteSpace: "nowrap",
                        }}
                      >
                        +7 after one course
                      </span>
                    </div>
                  </div>
                </TrackedLink>
                <UploadCard guest={guest} />
                <p
                  style={{
                    marginTop: 14,
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: "var(--tx3)",
                  }}
                >
                  Not ready to sign up?{" "}
                  <TrackedLink
                    href="/ats-score-checker"
                    section="hero"
                    label="ats_score_checker"
                    style={{
                      color: "var(--tx2)",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    Check your resume&rsquo;s ATS score free, no account needed
                  </TrackedLink>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {done && (
        <GuestResultSection state={guest} guestToken={guest.guestToken} />
      )}
    </>
  );
}

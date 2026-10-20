"use client";

import Image from "next/image";
import { ArrowRight } from "./icons";
import TrackedLink from "./TrackedLink";
import GuestResultSection from "./GuestResultSection";
import { UploadCard } from "./ResumeUploadCard";
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
          padding: done ? "36px 0 0" : "64px 0 110px",
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
                  See exactly what&rsquo;s missing between you and the role you want
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
                  Upload your resume. SkillDrift scores your skills against your target
                  role, builds the path to close the gap, and updates your resume
                  automatically as you go.
                </p>
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
                  <span>iOS + Android</span>
                  <span style={{ width: 1, height: 14, background: "var(--line2)" }} />
                  <span>Gaps &amp; job matches always free</span>
                </div>
              </div>
            )}

            {!done && (
              <div>
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

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, DocPlus, DocScan } from "./icons";
import SectionLink from "./SectionLink";
import { homeCta } from "@/lib/cta";

type Phase = "idle" | "parsing" | "result";

const avatars = ["av1", "av2", "av3", "av4"];

const panelBorder: React.CSSProperties = {
  borderRadius: 26,
  padding: 1,
  background:
    "linear-gradient(150deg, rgba(255,255,255,.20), rgba(124,93,249,.22) 40%, transparent 72%)",
};

const gaps = [
  { label: "Experiment design", pct: 34 },
  { label: "Dashboard tooling", pct: 21 },
  { label: "Stakeholder comms", pct: 46 },
];

const matches = [
  { score: 88, role: "Product Analyst", meta: "Fintech company · Bengaluru", blur: 0 },
  { score: 81, role: "Business Analyst", meta: "SaaS company · Remote", blur: 0 },
  {
    score: 74,
    role: "Data Analyst — Internship",
    meta: "Under 1 yr experience · Remote",
    blur: 0,
  },
  { score: 71, role: "Growth Analyst", meta: "Marketplace · Pune", blur: 4.5 },
  { score: 69, role: "Operations Analyst", meta: "Logistics · Hyderabad", blur: 6 },
];

export default function HeroAndResult() {
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const startUpload = useCallback(() => {
    setPhase((current) => {
      if (current !== "idle") return current;
      timer.current = setTimeout(() => setPhase("result"), 1700);
      return "parsing";
    });
  }, []);

  const done = phase === "result";

  const ctaLabel =
    phase === "result"
      ? "See your result"
      : phase === "parsing"
        ? "Scoring your resume…"
        : "Get my readiness score";

  return (
    <>
      <section
        id="top"
        style={{
          position: "relative",
          padding: done ? "110px 0 0" : "64px 0 110px",
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
                  <Link
                    href="/how-it-works"
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
                  </Link>
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
              <div style={panelBorder}>
                <div
                  className="sd-pad-40"
                  style={{
                    borderRadius: 25,
                    background: "var(--bg2)",
                    padding: "34px 40px 40px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 24,
                      paddingBottom: 26,
                      borderBottom: "1px solid var(--line)",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontSize: 22,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Now do it with your resume.
                      </h2>
                      <p
                        style={{
                          marginTop: 10,
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "var(--tx2)",
                          maxWidth: 640,
                        }}
                      >
                        Upload it once. You get your readiness score, your closest roles,
                        your real gaps and week one of a plan built for them.
                      </p>
                    </div>
                    <span
                      style={{
                        flex: "0 0 auto",
                        padding: "9px 18px",
                        borderRadius: 999,
                        border: "1px solid var(--acline)",
                        fontSize: 13,
                        color: "var(--tx)",
                      }}
                    >
                      Takes about a minute
                    </span>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={startUpload}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        startUpload();
                      }
                    }}
                    style={{
                      marginTop: 26,
                      borderRadius: 18,
                      minHeight: 210,
                      display: "grid",
                      placeItems: "center",
                      padding: 30,
                      cursor: "pointer",
                      transition: "border-color .2s, background .2s",
                      border:
                        phase === "idle"
                          ? "1.5px dashed var(--line2)"
                          : "1.5px solid var(--ac)",
                      background: phase === "idle" ? "transparent" : "var(--acsoft)",
                    }}
                  >
                    {phase === "idle" && (
                      <div
                        style={{
                          display: "grid",
                          placeItems: "center",
                          gap: 14,
                          textAlign: "center",
                        }}
                      >
                        <DocScan style={{ color: "var(--tx)" }} />
                        <div style={{ fontSize: 18, fontWeight: 500, color: "var(--tx)" }}>
                          Drop your resume here
                        </div>
                        <div style={{ fontSize: 14, color: "var(--tx3)" }}>
                          PDF or DOCX &middot; up to 5 MB &middot; takes about a minute
                        </div>
                      </div>
                    )}
                    {phase === "parsing" && (
                      <div
                        style={{
                          display: "grid",
                          placeItems: "center",
                          gap: 16,
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 999,
                            border: "2.5px solid var(--acsoft)",
                            borderTopColor: "var(--ac)",
                            animation: "sd-spin .8s linear infinite",
                          }}
                        />
                        <div style={{ fontSize: 17, fontWeight: 500, color: "var(--tx)" }}>
                          Reading anita-sharma-resume.pdf
                        </div>
                        <div style={{ fontSize: 14, color: "var(--tx3)" }}>
                          Scoring your skills against Product Analyst&hellip;
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={startUpload}
                    style={{
                      marginTop: 18,
                      width: "100%",
                      height: 58,
                      borderRadius: 14,
                      border: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      fontSize: 16,
                      fontWeight: 500,
                      transition: "all .2s",
                      background: phase === "idle" ? "var(--card2)" : "var(--ac)",
                      color: phase === "idle" ? "var(--tx3)" : "#FFFFFF",
                    }}
                  >
                    <span>{ctaLabel}</span>
                    <ArrowRight size={18} />
                  </button>

                  <p
                    style={{
                      marginTop: 18,
                      fontSize: 13,
                      lineHeight: 1.65,
                      color: "var(--tx3)",
                      maxWidth: 820,
                    }}
                  >
                    We read your resume to score it and find matches. We store it so you
                    don&rsquo;t have to upload it again if you make an account, and delete
                    it after 30 days if you don&rsquo;t.{" "}
                    <SectionLink
                      to="footer"
                      style={{
                        color: "var(--tx2)",
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      Privacy policy
                    </SectionLink>
                    .
                  </p>
                  <label
                    style={{
                      marginTop: 14,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 13,
                      color: "var(--tx3)",
                      maxWidth: 820,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        marginTop: 2,
                        width: 15,
                        height: 15,
                        accentColor: "var(--ac)",
                      }}
                    />
                    <span>
                      Send me occasional email about roles that match my profile. Unticked
                      on purpose &mdash; separate from the score above.
                    </span>
                  </label>

                  <a
                    href={homeCta("hero_build_resume")}
                    style={{
                      marginTop: 24,
                      paddingTop: 24,
                      borderTop: "1px solid var(--line)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 20,
                      flexWrap: "wrap",
                      color: "inherit",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span
                        style={{
                          flex: "0 0 auto",
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          display: "grid",
                          placeItems: "center",
                          background: "var(--acsoft)",
                          color: "var(--ac)",
                        }}
                      >
                        <DocPlus />
                      </span>
                      <span>
                        <span
                          style={{
                            display: "block",
                            fontSize: 15.5,
                            fontWeight: 500,
                            color: "var(--tx)",
                          }}
                        >
                          Don&rsquo;t have a resume?
                        </span>
                        <span
                          style={{
                            display: "block",
                            marginTop: 3,
                            fontSize: 14,
                            color: "var(--tx2)",
                          }}
                        >
                          Build one with SkillDrift AI in 2 minutes.
                        </span>
                      </span>
                    </span>
                    <span
                      style={{
                        flex: "0 0 auto",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 9,
                        height: 44,
                        padding: "0 20px",
                        borderRadius: 12,
                        border: "1px solid var(--line2)",
                        fontSize: 14.5,
                        fontWeight: 500,
                        color: "var(--tx)",
                      }}
                    >
                      Build my resume
                      <ArrowRight size={16} />
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {done && <ResultSection />}
    </>
  );
}

function ResultSection() {
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
            style={{
              position: "absolute",
              top: -260,
              right: -160,
              width: 700,
              height: 700,
              pointerEvents: "none",
              background:
                "radial-gradient(circle at 50% 50%, rgba(124,93,249,.22), transparent 62%)",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))",
              gap: 36,
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "var(--tx3)",
                }}
              >
                Scored against
              </div>
              <div style={{ marginTop: 8, fontSize: 20, fontWeight: 600 }}>
                Product Analyst
              </div>
              <div
                style={{ marginTop: 26, position: "relative", width: 190, height: 190 }}
              >
                <svg
                  viewBox="0 0 120 120"
                  style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="var(--line2)"
                    strokeWidth="9"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="var(--ac)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray="326.7"
                    strokeDashoffset="104.5"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 52,
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      68
                    </div>
                    <div style={{ marginTop: 4, fontSize: 13, color: "var(--tx3)" }}>
                      out of 100
                    </div>
                  </div>
                </div>
              </div>
              <p
                style={{
                  marginTop: 22,
                  maxWidth: 280,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--tx2)",
                }}
              >
                Free, and yours &mdash; not a sample. No account, no redirect.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em" }}>
                Three things are holding your score down
              </h3>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--tx3)",
                }}
              >
                Named for free. The detail, and what to do about each one, is behind
                signup.
              </p>
              <ul
                style={{
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {gaps.map((gap) => (
                  <li key={gap.label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 15,
                      }}
                    >
                      <span>{gap.label}</span>
                      <span style={{ color: "var(--tx2)" }}>{gap.pct}%</span>
                    </div>
                    <div
                      style={{
                        marginTop: 9,
                        height: 7,
                        borderRadius: 99,
                        background: "var(--card2)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${gap.pct}%`,
                          height: "100%",
                          borderRadius: 99,
                          background: "var(--ac)",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em" }}>
                  Three roles you match right now
                </h3>
                <span style={{ flex: "0 0 auto", fontSize: 13, color: "var(--ac)" }}>
                  24 more found
                </span>
              </div>
              <ul
                style={{
                  marginTop: 22,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {matches.map((match) => (
                  <li
                    key={match.role}
                    aria-hidden={match.blur ? true : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 16px",
                      borderRadius: 14,
                      border: "1px solid var(--line)",
                      background: "var(--card)",
                      filter: match.blur ? `blur(${match.blur}px)` : undefined,
                      opacity: match.blur === 4.5 ? 0.55 : match.blur ? 0.4 : 1,
                    }}
                  >
                    <span
                      style={{
                        flex: "0 0 auto",
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: "grid",
                        placeItems: "center",
                        background: "var(--acsoft)",
                        color: "var(--ac)",
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {match.score}
                    </span>
                    <span>
                      <span style={{ display: "block", fontSize: 15, fontWeight: 500 }}>
                        {match.role}
                      </span>
                      <span
                        style={{
                          display: "block",
                          marginTop: 3,
                          fontSize: 13,
                          color: "var(--tx3)",
                        }}
                      >
                        {match.meta}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              marginTop: 36,
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
                All 24 matches, the full gap report, and the roadmap that closes it.
                <br />
                Your resume is already here &mdash; you will not upload it again.
              </p>
            </div>
            <a
              href={homeCta("result_create_account")}
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

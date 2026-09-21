"use client";

import GuestResultSection from "./GuestResultSection";
import { UploadCard } from "./ResumeUploadCard";
import { useGuestAnalysis } from "@/hooks/useGuestAnalysis";

/**
 * Two-column hero for /skills/[role], laid out like the homepage: the answer
 * to the search on the left, the same anonymous upload card on the right.
 * Owns the guest state so the result view can take the full width once a
 * resume has been scored, exactly as HeroAndResult does.
 */
export default function RoleHero({
  h1,
  answer,
  intro,
  role,
  campaign,
}: {
  h1: string;
  answer: string;
  intro: string;
  role: string;
  campaign: string;
}) {
  const guest = useGuestAnalysis();

  if (guest.phase === "ready") {
    return (
      <>
        <section style={{ padding: "28px 0 8px" }}>
          <div className="wrap">
            <h1
              style={{
                maxWidth: 900,
                fontSize: "clamp(36px,4.2vw,58px)",
                lineHeight: 1.08,
                fontWeight: 600,
                letterSpacing: "-0.025em",
              }}
            >
              {h1}
            </h1>
          </div>
        </section>
        <GuestResultSection state={guest} guestToken={guest.guestToken} campaign={campaign} />
      </>
    );
  }

  return (
    <section id="top" style={{ padding: "28px 0 40px" }}>
      <div className="wrap">
        <div
          className="sd-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(440px,100%),1fr))",
            gap: 96,
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(36px,4.2vw,58px)",
                lineHeight: 1.08,
                fontWeight: 600,
                letterSpacing: "-0.025em",
              }}
            >
              {h1}
            </h1>
            <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.62, color: "var(--tx2)" }}>{answer}</p>
            <p style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.6, color: "var(--tx2)" }}>
              <strong style={{ color: "var(--tx)" }}>Check yours against a real {role} job.</strong> {intro}
            </p>
          </div>
          <div>
            <UploadCard guest={guest} campaign={campaign} />
          </div>
        </div>
      </div>
    </section>
  );
}

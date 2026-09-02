"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowRight, DocPlus, DocScan } from "./icons";
import TrackedLink from "./TrackedLink";
import GuestResultSection from "./GuestResultSection";
import StickyUploadCta from "./StickyUploadCta";
import UploadProgress from "./UploadProgress";
import { homeCta } from "@/lib/cta";
import { ACCEPTED_TYPES } from "@/lib/guest-api";
import { useGuestAnalysis } from "@/hooks/useGuestAnalysis";
import { AnalyticsEvents, track } from "@/lib/analytics";
import { trackCta } from "@/lib/analytics/cta";
import { markUploadStarted } from "@/lib/anon-session";

/*
 * The anonymous upload card, lifted out of HeroAndResult so it can render on
 * more than one page. Nothing about its behaviour changed in the move.
 *
 * Two ways in:
 *  - `UploadCard` (named): the card alone, driven by a guest-analysis instance
 *    the caller owns. HeroAndResult uses this so the homepage hero can react
 *    to the same state (hide the copy, show the result section).
 *  - default `ResumeUploadCard`: no props. Owns its own guest-analysis state
 *    and swaps itself for the result section when the analysis is ready.
 *    Used on /ats-score-checker.
 */

const panelBorder: React.CSSProperties = {
  borderRadius: 26,
  padding: 1,
  background:
    "linear-gradient(150deg, rgba(255,255,255,.20), rgba(124,93,249,.22) 40%, transparent 72%)",
};

type Guest = ReturnType<typeof useGuestAnalysis>;

export function UploadCard({ guest }: { guest: Guest }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  // The marketing opt-in checkbox is commented out in the markup below, so
  // this is always false today. Re-enabling it means making this state again
  // and pointing the box's `checked`/`onChange` at it.
  const optIn = false;
  // Which control the file came from. Read at upload time, not at click time,
  // because the picker opens from two different buttons.
  const entryMethod = useRef<"drag_drop" | "file_picker">("file_picker");
  const dropZone = useRef<HTMLDivElement>(null);

  const { phase, status, fileName, error } = guest;
  const busy = phase === "uploading" || phase === "processing";

  const openPicker = useCallback(() => {
    if (busy) return;
    entryMethod.current = "file_picker";
    inputRef.current?.click();
  }, [busy]);

  const takeFile = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;

      // Fires the moment the file lands, before any processing — so the
      // denominator counts every attempt, including ones we reject.
      const extension = file.name.split(".").pop()?.toLowerCase() ?? null;
      markUploadStarted();
      track(AnalyticsEvents.ANONYMOUS_UPLOAD_STARTED, {
        file_type: extension,
        file_size_bytes: file.size,
        entry_method: entryMethod.current,
        marketing_opt_in: optIn,
      });

      guest.upload(file);
    },
    [guest, optIn],
  );

  const ctaLabel =
    phase === "uploading"
      ? "Uploading…"
      : phase === "processing"
        ? status === "analysis_ready"
          ? "Almost there…"
          : "Scoring your resume…"
        : "Get my readiness score";

  return (
    <>
      <div style={panelBorder}>
        <div
          className="sd-pad-40"
          style={{
            borderRadius: 25,
            background: "var(--bg2)",
            padding: "34px 40px 40px",
          }}
        >
          {/* Title and the timing pill share a row so the card stays short. */}
          <div
            style={{
              paddingBottom: 22,
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                Start with your resume.
              </h2>
              <span
                style={{
                  flex: "0 0 auto",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid var(--acline)",
                  fontSize: 13,
                  color: "var(--tx)",
                }}
              >
                Takes about a minute
              </span>
            </div>
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

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES}
            hidden
            onChange={(e) => {
              takeFile(e.target.files);
              // Let the same file be chosen twice in a row.
              e.target.value = "";
            }}
          />

          <div
            ref={dropZone}
            role="button"
            tabIndex={0}
            aria-label="Upload your resume"
            aria-busy={busy}
            onClick={openPicker}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPicker();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!busy) setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              if (busy) return;
              entryMethod.current = "drag_drop";
              takeFile(e.dataTransfer.files);
            }}
            style={{
              marginTop: 26,
              borderRadius: 18,
              minHeight: 210,
              display: "grid",
              placeItems: "center",
              padding: 30,
              cursor: busy ? "default" : "pointer",
              transition: "border-color .2s, background .2s",
              border:
                busy || dragging
                  ? "1.5px solid var(--ac)"
                  : "1.5px dashed var(--line2)",
              background: busy || dragging ? "var(--acsoft)" : "transparent",
            }}
          >
            {!busy && (
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
                  PDF, DOC or DOCX &middot; up to 5 MB &middot; takes about a
                  minute
                </div>
              </div>
            )}
            {busy && (
              <UploadProgress
                phase={phase}
                status={status}
                fileName={fileName}
              />
            )}
          </div>

          <button
            type="button"
            onClick={openPicker}
            disabled={busy}
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
              cursor: busy ? "default" : "pointer",
              background: busy ? "var(--ac)" : "var(--card2)",
              color: busy ? "#FFFFFF" : "var(--tx3)",
            }}
          >
            <span>{ctaLabel}</span>
            <ArrowRight size={18} />
          </button>

          {error && (
            <div
              role="alert"
              style={{
                marginTop: 16,
                padding: "14px 16px",
                borderRadius: 12,
                border: "1px solid var(--acline)",
                background: "var(--acsoft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 14,
                flexWrap: "wrap",
                fontSize: 14,
                lineHeight: 1.55,
                color: "var(--tx)",
              }}
            >
              <span>{error}</span>
              {(phase === "failed" || phase === "expired") && (
                <button
                  type="button"
                  onClick={() => {
                    guest.reset();
                    openPicker();
                  }}
                  style={{
                    flex: "0 0 auto",
                    height: 36,
                    padding: "0 16px",
                    borderRadius: 10,
                    border: "1px solid var(--line2)",
                    background: "transparent",
                    fontSize: 13.5,
                    fontWeight: 500,
                  }}
                >
                  Upload again
                </button>
              )}
            </div>
          )}

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
            <TrackedLink
              href="/privacy-policy"
              section="upload_widget"
              label="privacy_policy"
              style={{
                color: "var(--tx2)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Privacy policy
            </TrackedLink>
            .
          </p>
          {/* <label
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
              Send me occasional email about roles that match my profile.
            </span>
          </label> */}

          <a
            href={homeCta("hero_build_resume")}
            onClick={() => {
              trackCta("hero", "build_resume");
              track(AnalyticsEvents.ANONYMOUS_UPLOAD_STARTED, {
                file_type: null,
                file_size_bytes: null,
                entry_method: "build_resume_instead",
                marketing_opt_in: optIn,
              });
            }}
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

      <StickyUploadCta dropZone={dropZone} onUpload={openPicker} />
    </>
  );
}

export default function ResumeUploadCard() {
  const guest = useGuestAnalysis();

  if (guest.phase === "ready") {
    return <GuestResultSection state={guest} guestToken={guest.guestToken} />;
  }

  // Owns its section so the result view above (which brings its own section
  // and .wrap) can swap in at full width without nesting wraps.
  return (
    <section id="top" style={{ padding: "8px 0 26px" }}>
      <div className="wrap">
        <div style={{ maxWidth: 860 }}>
          <UploadCard guest={guest} />
        </div>
      </div>
    </section>
  );
}

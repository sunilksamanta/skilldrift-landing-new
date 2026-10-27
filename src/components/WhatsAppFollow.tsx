import TrackedLink from "./TrackedLink";
import { ArrowRight } from "./icons";

/*
 * "Follow on WhatsApp" box for the channel SkillDrift Jobs & Internships.
 * Plan: claude/skilldrift-whatsapp-followers-plan-271026.md (27 Oct 2026).
 *
 * The link goes through our own /channel redirect (next.config.ts), so the
 * channel can change without touching every page, and the click is counted
 * as cta_clicked with section whatsapp_channel.
 */
export const CHANNEL_URL = "https://www.skilldrift.ai/channel";

export function WhatsAppGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 7.9c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.7.9 1.3 1.5 1.8.5.4 1 .7 1.5.9.2.1.4.1.5-.1l.6-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .4-.1 1-.5 1.4-.5.5-1.3.8-2.1.6-1.3-.3-2.6-1-3.7-2.1-1.1-1-1.9-2.3-2.2-3.6-.2-.9 0-1.7.6-2.4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function WhatsAppFollow({
  heading,
  line,
  placement,
  extra,
  marginTop = 48,
}: {
  heading: string;
  line: string;
  /** Where the box sits, sent as the CTA label: role_page, jobs_page. */
  placement: string;
  extra?: Record<string, string>;
  marginTop?: number;
}) {
  return (
    <aside
      aria-label="Follow SkillDrift Jobs & Internships on WhatsApp"
      style={{
        marginTop,
        padding: "26px 28px",
        borderRadius: 22,
        border: "1px solid var(--line)",
        background: "var(--card)",
        boxShadow: "0 24px 60px -28px rgba(76,52,180,.32)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "18px 24px",
      }}
    >
      <span
        style={{
          flex: "0 0 auto",
          width: 52,
          height: 52,
          borderRadius: 999,
          display: "grid",
          placeItems: "center",
          background: "var(--acsoft)",
          color: "var(--ac)",
        }}
      >
        <WhatsAppGlyph size={26} />
      </span>
      <div style={{ flex: "1 1 280px", minWidth: 0 }}>
        <span
          style={{
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ac)",
          }}
        >
          WhatsApp channel
        </span>
        <p style={{ marginTop: 6, fontSize: 19, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.3 }}>
          {heading}
        </p>
        <p style={{ marginTop: 6, fontSize: 15, lineHeight: 1.55, color: "var(--tx2)" }}>{line}</p>
      </div>
      <TrackedLink
        href={CHANNEL_URL}
        newTab
        section="whatsapp_channel"
        label={placement}
        extra={extra}
        ariaLabel="Follow SkillDrift Jobs & Internships on WhatsApp"
        style={{
          flex: "0 0 auto",
          height: 50,
          padding: "0 26px",
          borderRadius: 999,
          background: "var(--tx)",
          color: "var(--bg)",
          fontSize: 16,
          fontWeight: 500,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        Follow
        <ArrowRight size={17} strokeWidth={1.9} />
      </TrackedLink>
    </aside>
  );
}

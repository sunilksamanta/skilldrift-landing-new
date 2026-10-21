import { useId } from "react";

/*
 * The score ring: SkillDrift's job score out of 100, drawn the way the app
 * draws it. Used as the site's repeated mark (hero result, the loop band,
 * section pills) so the one shape people remember is the score.
 */
export default function ScoreRing({
  value,
  size = 64,
  stroke = 6,
  track = "rgba(124,93,249,.16)",
  color,
  label = true,
  textColor = "var(--tx)",
  fontSize,
  transition = true,
}: {
  value: number;
  size?: number;
  stroke?: number;
  track?: string;
  color?: string;
  label?: boolean;
  textColor?: string;
  fontSize?: number;
  transition?: boolean;
}) {
  // A gradient per instance: a shared id breaks when the first ring that
  // defines it is hidden (display:none gradients do not paint elsewhere).
  const gid = "sdRing" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, value)) / 100);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`${Math.round(value)} out of 100`}
      style={{ display: "block", flex: "0 0 auto" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9B82FF" />
          <stop offset="100%" stopColor="#5B3FD0" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color ?? `url(#${gid})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={transition ? { transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" } : undefined}
      />
      {label && (
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill={textColor}
          style={{ fontSize: fontSize ?? Math.round(size * 0.3), fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {Math.round(value)}
        </text>
      )}
    </svg>
  );
}

/** A tiny ring used as a bullet in section pills. */
export function RingMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" style={{ display: "block", flex: "0 0 auto" }}>
      <circle cx="7" cy="7" r="5.2" fill="none" stroke="rgba(124,93,249,.22)" strokeWidth="2.2" />
      <circle
        cx="7"
        cy="7"
        r="5.2"
        fill="none"
        stroke="#7C5DF9"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="32.7"
        strokeDashoffset="8.5"
        transform="rotate(-90 7 7)"
      />
    </svg>
  );
}

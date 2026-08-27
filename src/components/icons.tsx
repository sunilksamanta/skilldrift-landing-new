import type { CSSProperties } from "react";

type IconProps = {
  size?: number;
  strokeWidth?: number;
  style?: CSSProperties;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowRight({ size = 17, strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg {...base} width={size} height={size} strokeWidth={strokeWidth} style={style}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ size = 17, strokeWidth = 2.2, style }: IconProps) {
  return (
    <svg {...base} width={size} height={size} strokeWidth={strokeWidth} style={style}>
      <path d="M4 12.5l5.2 5.2L20 7" />
    </svg>
  );
}

export function Plus({ size = 20, strokeWidth = 1.7, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      style={style}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Sun({ size = 20, strokeWidth = 1.7, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      style={style}
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
    </svg>
  );
}

export function DocScan({ size = 42, strokeWidth = 1.4, style }: IconProps) {
  return (
    <svg {...base} width={size} height={size} strokeWidth={strokeWidth} style={style}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <circle cx="12" cy="13" r="2" />
      <path d="M8.6 18.2a3.6 3.6 0 0 1 6.8 0" />
    </svg>
  );
}

export function DocPlus({ size = 19, strokeWidth = 1.7, style }: IconProps) {
  return (
    <svg {...base} width={size} height={size} strokeWidth={strokeWidth} style={style}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M12 11v6M9 14h6" />
    </svg>
  );
}

export function Lock({ size = 14, strokeWidth = 1.8, style }: IconProps) {
  return (
    <svg {...base} width={size} height={size} strokeWidth={strokeWidth} style={style}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.6" />
      <path d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9" />
    </svg>
  );
}

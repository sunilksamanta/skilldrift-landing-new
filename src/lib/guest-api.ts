/**
 * Client for the guest resume flow — everything a visitor can do before they
 * have an account. See docs/guest-flow-api.md.
 *
 * All guest endpoints authenticate with an `x-guest-token` header and never an
 * Authorization header. Every response is wrapped in an envelope whose payload
 * sits under `data`; this module unwraps it so callers see the payload only.
 */

const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_TYPES = ".pdf,.doc,.docx";

export type GuestSession = { guestToken: string; sessionId: string };

export type GuestStatus = "processing" | "analysis_ready" | "completed" | "failed";
export type GuestStatusResponse = {
  sessionId: string;
  status: GuestStatus;
  error: string | null;
};

export type ResumeAnalysis = {
  /** Always null for guests — nothing exists in the database yet. */
  _id: null;
  sessionId: string;
  analysisCompleted: boolean;
  industryType?: string;
  analysis: {
    personalInfo?: { name?: string; region?: string };
    totalYearsOfExperience?: number;
    jobSearchTitle?: string;
    jobSearchTitles?: string[];
    overall?: {
      atsScore?: number;
      strengths?: string[];
      weaknesses?: string[];
      missingSections?: string[];
      recommendations?: string[];
    };
  };
};

export type SkillCategory = {
  category: string;
  skillLevelScore: number;
  industryBenchmark: number;
  priority: "high" | "medium" | "low" | string;
  identifiedGaps?: string[];
  actionableRecommendations?: string[];
};

export type SkillGapAnalysis = {
  domainAnalysis?: {
    primaryDomain?: string;
    experienceLevel?: string;
    specialization?: string;
    /** Often a full sentence rather than a job title — clamp it in the UI. */
    targetRole?: string;
  };
  skillCategories?: SkillCategory[];
  /** Parallel arrays — `skills[i]` is scored by `candidateScores[i]`. */
  radarChartData?: {
    skills?: string[];
    candidateScores?: number[];
    industryAverages?: number[];
  };
  overallAssessment?: {
    competitivePosition?: "below_average" | "average" | "above_average" | "excellent";
    topStrengths?: string[];
    criticalGaps?: string[];
    marketRelevanceScore?: number;
  };
  careerPathId: null;
  /** Set when the resume had nothing to analyse. */
  error: string | null;
};

export type GuestJob = {
  jobId: string;
  jobTitle: string;
  employerName?: string;
  employerLogo?: string | null;
  jobLocation?: string;
  jobEmploymentType?: string;
  jobIsRemote?: boolean;
  jobApplyLink?: string;
  jobDescription?: string;
  /** Null for a job the matcher skipped — guard before reading matchScore. */
  analysis: {
    matchScore: number;
    matchPercentage?: string;
    reasoning?: string;
    keyMatchingSkills?: string[];
    skillGaps?: string[];
  } | null;
};

export type GuestJobsResponse = {
  status: "processing" | "ready" | "failed";
  jobs: GuestJob[];
};

/** A failure from the API, carrying the documented `name` as `code`. */
export class GuestApiError extends Error {
  readonly code: string;
  readonly statusCode: number;

  constructor(message: string, code: string, statusCode: number) {
    super(message);
    this.name = "GuestApiError";
    this.code = code;
    this.statusCode = statusCode;
  }

  /** 409 — that stage is not ready yet. Keep waiting; this is not an error. */
  get isPending() {
    return this.statusCode === 409 || this.code === "GUEST_ANALYSIS_PENDING";
  }

  /** 410 — the session is gone. The only case where the token may be cleared. */
  get isExpired() {
    return this.statusCode === 410 || this.code === "GUEST_SESSION_EXPIRED";
  }

  /** 422 — the AI pipeline failed; offer a re-upload. */
  get isAnalysisFailed() {
    return this.code === "GUEST_ANALYSIS_FAILED";
  }

  get isRateLimited() {
    return this.statusCode === 429;
  }
}

async function parse<T>(res: Response): Promise<T> {
  const text = await res.text();

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    // 429 comes back as plain text rather than the envelope.
    if (!res.ok) {
      throw new GuestApiError(
        text.trim() || `Request failed (${res.status})`,
        res.status === 429 ? "RATE_LIMITED" : "UNKNOWN_ERROR",
        res.status,
      );
    }
    throw new GuestApiError("Unreadable response from the server", "UNKNOWN_ERROR", res.status);
  }

  const envelope = body as {
    error?: boolean;
    name?: string;
    message?: string;
    statusCode?: number;
    data?: T;
  };

  if (!res.ok || envelope.error) {
    throw new GuestApiError(
      envelope.message ?? `Request failed (${res.status})`,
      envelope.name ?? "UNKNOWN_ERROR",
      envelope.statusCode ?? res.status,
    );
  }

  return envelope.data as T;
}

function guestHeaders(token: string): HeadersInit {
  // Never send Authorization alongside the guest token.
  return { "x-guest-token": token };
}

/**
 * Returns as soon as the file is accepted — the analysis runs in the
 * background, so do not hold a spinner on this call.
 */
export async function uploadResume(file: File): Promise<GuestSession> {
  const form = new FormData();
  // Content-Type is deliberately unset: the browser adds the multipart boundary.
  form.append("file", file);

  const res = await fetch(`${BASE}/api/guest/upload`, { method: "POST", body: form });
  return parse<GuestSession>(res);
}

export async function fetchStatus(
  session: GuestSession,
): Promise<GuestStatusResponse> {
  const res = await fetch(`${BASE}/api/guest/status/${session.sessionId}`, {
    headers: guestHeaders(session.guestToken),
  });
  return parse<GuestStatusResponse>(res);
}

export async function fetchResumeAnalysis(token: string): Promise<ResumeAnalysis> {
  const res = await fetch(`${BASE}/api/guest/resume-analysis`, {
    headers: guestHeaders(token),
  });
  return parse<ResumeAnalysis>(res);
}

export async function fetchSkillGap(token: string): Promise<SkillGapAnalysis> {
  const res = await fetch(`${BASE}/api/guest/skill-gap-analysis`, {
    headers: guestHeaders(token),
  });
  return parse<SkillGapAnalysis>(res);
}

export async function fetchJobs(token: string): Promise<GuestJobsResponse> {
  const res = await fetch(`${BASE}/api/guest/jobs`, {
    headers: guestHeaders(token),
  });
  return parse<GuestJobsResponse>(res);
}

/** Client-side guard so an obviously wrong file never spends a rate-limit slot. */
export function validateFile(file: File): string | null {
  const name = file.name.toLowerCase();
  const looksRight = [".pdf", ".doc", ".docx"].some((ext) => name.endsWith(ext));
  if (!looksRight) return "That file type isn't supported. Upload a PDF, DOC or DOCX.";
  if (file.size > MAX_UPLOAD_BYTES) return "That file is over 5 MB. Try a smaller one.";
  if (file.size === 0) return "That file is empty.";
  return null;
}

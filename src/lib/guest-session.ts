import type {
  GuestJobsResponse,
  GuestSession,
  GuestStatus,
  ResumeAnalysis,
  SkillGapAnalysis,
} from "./guest-api";

/**
 * The guest token and session id are the only handle on a visitor's analysis —
 * there is no way to look a session up again once they are lost, so they are
 * stored together and cleared only when the API says the session is gone.
 */
const KEY = "sd-guest-session";
const RESULT_KEY = "sd-guest-result";

/** Matches the server-side session lifetime; a colder cache is not trustworthy. */
const RESULT_TTL_MS = 48 * 60 * 60 * 1000;

export type StoredSession = GuestSession & { fileName?: string };

export function readSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredSession>;
    if (!parsed.guestToken || !parsed.sessionId) return null;
    return {
      guestToken: parsed.guestToken,
      sessionId: parsed.sessionId,
      fileName: parsed.fileName,
    };
  } catch {
    return null;
  }
}

export function saveSession(session: GuestSession, fileName?: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...session, fileName }));
  } catch {
    /* private mode — the flow still works for this page view */
  }
}

/** Only ever call this on a 410. Any other failure may be temporary. */
export function clearSession(): void {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(RESULT_KEY);
  } catch {
    /* nothing to do */
  }
}

/**
 * The finished analysis, cached beside the session.
 *
 * Without this a reload drops the visitor back into the "reading your
 * resume…" upload panel until the pollers catch up — which reads as the upload
 * starting over, and invites them to drop the file again. With it the results
 * paint immediately and the pollers only revalidate.
 */
export type StoredResult = {
  sessionId: string;
  savedAt: number;
  status: GuestStatus | null;
  analysis: ResumeAnalysis | null;
  skillGap: SkillGapAnalysis | null;
  jobs: GuestJobsResponse | null;
};

export function readResult(sessionId: string): StoredResult | null {
  try {
    const raw = localStorage.getItem(RESULT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredResult>;
    if (parsed.sessionId !== sessionId) return null;
    if (!parsed.savedAt || Date.now() - parsed.savedAt > RESULT_TTL_MS) return null;
    if (!parsed.analysis) return null;
    return {
      sessionId,
      savedAt: parsed.savedAt,
      status: parsed.status ?? null,
      analysis: parsed.analysis,
      skillGap: parsed.skillGap ?? null,
      jobs: parsed.jobs ?? null,
    };
  } catch {
    return null;
  }
}

export function saveResult(result: Omit<StoredResult, "savedAt">): void {
  try {
    localStorage.setItem(RESULT_KEY, JSON.stringify({ ...result, savedAt: Date.now() }));
  } catch {
  }
}

export function clearResult(): void {
  try {
    localStorage.removeItem(RESULT_KEY);
  } catch {
  }
}

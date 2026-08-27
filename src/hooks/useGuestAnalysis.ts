"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  GuestApiError,
  fetchJobs,
  fetchResumeAnalysis,
  fetchSkillGap,
  fetchStatus,
  uploadResume,
  validateFile,
  type GuestJobsResponse,
  type GuestStatus,
  type ResumeAnalysis,
  type SkillGapAnalysis,
} from "@/lib/guest-api";
import {
  clearResult,
  clearSession,
  readResult,
  readSession,
  saveResult,
  saveSession,
  type StoredSession,
} from "@/lib/guest-session";

const STATUS_POLL_MS = 3000;
const JOBS_POLL_MS = 5000;

export type Phase =
  | "idle"
  | "uploading"
  | "processing"
  /** Score and analysis are readable; gaps and jobs may still be running. */
  | "ready"
  | "failed"
  | "expired";

export type GuestState = {
  phase: Phase;
  status: GuestStatus | null;
  analysis: ResumeAnalysis | null;
  skillGap: SkillGapAnalysis | null;
  jobs: GuestJobsResponse | null;
  error: string | null;
  fileName: string | null;
  guestToken: string | null;
};

const INITIAL: GuestState = {
  phase: "idle",
  status: null,
  analysis: null,
  skillGap: null,
  jobs: null,
  error: null,
  fileName: null,
  guestToken: null,
};

/**
 * Drives the whole guest flow: upload, poll, and read the results.
 *
 * Two pollers run, each with its own terminal state — `completed`/`failed` for
 * the analysis and `ready`/`failed` for jobs — and both stop when they reach it.
 * Results render as soon as the status hits `analysis_ready` rather than waiting
 * for `completed`, which the API notes costs the visitor ~30 seconds of staring
 * at a progress bar.
 *
 * The pollers reschedule themselves through refs so each one can be a stable
 * callback that still recurses.
 */
export function useGuestAnalysis() {
  const [state, setState] = useState<GuestState>(INITIAL);

  const session = useRef<StoredSession | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const alive = useRef(true);
  const resultsStarted = useRef(false);
  /** Guards against a second upload starting while one is still in flight. */
  const uploading = useRef(false);
  const pollStatusRef = useRef<() => void>(() => {});
  const pollJobsRef = useRef<() => void>(() => {});

  const patch = useCallback((next: Partial<GuestState>) => {
    if (!alive.current) return;
    setState((prev) => {
      const merged = { ...prev, ...next };
      const current = session.current;
      // Cache anything worth repainting on reload, so coming back never looks
      // like the upload starting over.
      if (current && merged.analysis) {
        saveResult({
          sessionId: current.sessionId,
          status: merged.status,
          analysis: merged.analysis,
          skillGap: merged.skillGap,
          jobs: merged.jobs,
        });
      }
      return merged;
    });
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const stopTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  /** 410 is the only failure allowed to destroy the token. */
  const handleFatal = useCallback(
    (err: unknown) => {
      if (err instanceof GuestApiError && err.isExpired) {
        clearSession();
        session.current = null;
        patch({
          phase: "expired",
          guestToken: null,
          error: "This session has expired. Upload your resume again to see your score.",
        });
        return true;
      }
      if (err instanceof GuestApiError && err.isAnalysisFailed) {
        patch({ phase: "failed", error: err.message });
        return true;
      }
      return false;
    },
    [patch],
  );

  const pollJobs = useCallback(() => {
    const current = session.current;
    if (!current) return;

    fetchJobs(current.guestToken)
      .then((jobs) => {
        patch({ jobs });
        // `failed` or an empty list simply hides the section.
        if (jobs.status === "processing") {
          later(() => pollJobsRef.current(), JOBS_POLL_MS);
        }
      })
      .catch((err) => {
        // 409 means matching has not started yet — keep waiting.
        if (err instanceof GuestApiError && err.isPending) {
          later(() => pollJobsRef.current(), JOBS_POLL_MS);
          return;
        }
        if (err instanceof GuestApiError && err.isExpired) {
          handleFatal(err);
          return;
        }
        // Anything else: drop the jobs section quietly, the rest of the page stands.
        patch({ jobs: { status: "failed", jobs: [] } });
      });
  }, [handleFatal, later, patch]);

  const loadAnalysis = useCallback(() => {
    const current = session.current;
    if (!current) return;
    fetchResumeAnalysis(current.guestToken)
      .then((analysis) => patch({ analysis, phase: "ready" }))
      .catch((err) => {
        if (err instanceof GuestApiError && err.isPending) return;
        handleFatal(err);
      });
  }, [handleFatal, patch]);

  const loadSkillGap = useCallback(() => {
    const current = session.current;
    if (!current) return;
    fetchSkillGap(current.guestToken)
      .then((skillGap) => patch({ skillGap }))
      .catch((err) => {
        // Gaps are the slowest stage; a 409 just means not yet.
        if (err instanceof GuestApiError && err.isPending) return;
        if (err instanceof GuestApiError && err.isExpired) handleFatal(err);
      });
  }, [handleFatal, patch]);

  const pollStatus = useCallback(() => {
    const current = session.current;
    if (!current) return;

    fetchStatus(current)
      .then((res) => {
        patch({ status: res.status });

        if (res.status === "failed") {
          patch({
            phase: "failed",
            error: res.error ?? "We couldn't read that resume. Try uploading it again.",
          });
          return;
        }

        if (res.status === "analysis_ready" || res.status === "completed") {
          if (!resultsStarted.current) {
            resultsStarted.current = true;
            loadAnalysis();
            pollJobsRef.current();
          }
        }

        if (res.status === "completed") {
          loadSkillGap();
          return; // terminal — stop polling
        }

        later(() => pollStatusRef.current(), STATUS_POLL_MS);
      })
      .catch((err) => {
        if (err instanceof GuestApiError && err.isPending) {
          later(() => pollStatusRef.current(), STATUS_POLL_MS);
          return;
        }
        if (handleFatal(err)) return;
        later(() => pollStatusRef.current(), STATUS_POLL_MS);
      });
  }, [handleFatal, later, loadAnalysis, loadSkillGap, patch]);

  // Kept current after every render so the pollers can recurse through a ref
  // without either callback having to depend on the other.
  useEffect(() => {
    pollStatusRef.current = pollStatus;
    pollJobsRef.current = pollJobs;
  });

  const upload = useCallback(
    async (file: File) => {
      const invalid = validateFile(file);
      if (invalid) {
        patch({ phase: "idle", error: invalid });
        return;
      }

      if (uploading.current) return;
      uploading.current = true;

      stopTimers();
      resultsStarted.current = false;
      session.current = null;
      clearResult();
      patch({ ...INITIAL, phase: "uploading", fileName: file.name });

      try {
        const next = await uploadResume(file);
        // Persist immediately — losing these loses the analysis.
        saveSession(next, file.name);
        session.current = { ...next, fileName: file.name };
        patch({
          phase: "processing",
          status: "processing",
          guestToken: next.guestToken,
        });
        pollStatusRef.current();
      } catch (err) {
        const message =
          err instanceof GuestApiError
            ? err.message
            : "We couldn't reach the server. Check your connection and try again.";
        patch({ phase: "idle", error: message, fileName: null });
      } finally {
        uploading.current = false;
      }
    },
    [patch, stopTimers],
  );

  const reset = useCallback(() => {
    stopTimers();
    resultsStarted.current = false;
    session.current = null;
    clearSession();
    setState(INITIAL);
  }, [stopTimers]);

  // Restore an in-flight or finished session on reload. Deferred by a tick so
  // the first render is never re-entered synchronously.
  useEffect(() => {
    alive.current = true;
    const restore = setTimeout(() => {
      const stored = readSession();
      if (!stored) return;
      session.current = stored;

      // A finished analysis is repainted straight away; the pollers below only
      // revalidate it, so a reload never drops back to the upload panel.
      const cached = readResult(stored.sessionId);
      setState((prev) => ({
        ...prev,
        phase: cached ? "ready" : "processing",
        status: cached?.status ?? null,
        analysis: cached?.analysis ?? null,
        skillGap: cached?.skillGap ?? null,
        jobs: cached?.jobs ?? null,
        fileName: stored.fileName ?? null,
        guestToken: stored.guestToken,
      }));
      pollStatusRef.current();
    }, 0);

    return () => {
      alive.current = false;
      clearTimeout(restore);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  return { ...state, upload, reset };
}

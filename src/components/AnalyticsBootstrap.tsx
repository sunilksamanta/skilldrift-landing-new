"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";
import { anonSessionId } from "@/lib/anon-session";

/**
 * Starts Mixpanel and mints `anon_session_id` before anything can fire an
 * event. Renders nothing.
 */
export default function AnalyticsBootstrap() {
  useEffect(() => {
    anonSessionId();
    initAnalytics();
  }, []);
  return null;
}

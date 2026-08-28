import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Redirects for paths that existed on the previous site. Each one exists so a
   * link someone already published — or one Google still has indexed — lands on
   * the page that replaced it instead of a 404.
   *
   * `statusCode: 301` rather than `permanent: true`: Next's `permanent` emits a
   * 308, which preserves the request method. That distinction only matters for
   * non-GET requests, which these pages never receive, and 301 is the code every
   * crawler, CDN and link checker treats as canonical without qualification.
   * The two properties are mutually exclusive — setting both is an error.
   */
  redirects() {
    return [
      {
        // The terms page was /terms-conditions before the rewrite.
        source: "/terms-conditions",
        destination: "/terms-of-use",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;

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
      // Short link for posts in the SkillDrift Jobs & Internships WhatsApp
      // channel (26 Oct 2026). Keeps the campaign tags out of the post text.
      // Temporary (307), so the tags can change later without browsers
      // caching the old target. Panel row: ORGANIC_WhatsApp_Channel_261026.
      {
        source: "/wa",
        destination:
          "https://app.skilldrift.ai/sign-up?utm_source=whatsapp_channel&utm_medium=organic&utm_campaign=ORGANIC_WhatsApp_Channel_261026&utm_content=channel_post",
        permanent: false,
      },
      // Short link to the SkillDrift Jobs & Internships WhatsApp channel
      // (26 Oct 2026), for captions, ambassadors and posters. Temporary (307).
      {
        source: "/channel",
        destination: "https://whatsapp.com/channel/0029VbDo3S75kg6yzq8Qxp2A",
        permanent: false,
      },
      {
        // The terms page was /terms-conditions before the rewrite.
        source: "/terms-conditions",
        destination: "/terms-of-use",
        statusCode: 301,
      },
      // The blog moved to its own subdomain, where posts live under /posts.
      // `:slug*` also matches bare /blog, which lands on the posts index.
      {
        source: "/blog/:slug*",
        destination: "https://blog.skilldrift.ai/posts/:slug*",
        statusCode: 301,
      },
      // Some clients percent-encode the bang, and matching runs on the raw path.
      {
        source: "/%21",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/!",
        destination: "/",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;

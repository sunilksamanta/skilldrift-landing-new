import Script from "next/script";

/**
 * Google Analytics 4, carried over unchanged from the previous landing site.
 *
 * Same measurement ID as app.skilldrift.ai on purpose: ONE property, two
 * hostnames. Both share the skilldrift.ai registrable domain, so gtag's
 * default cookie_domain ("auto") writes _ga on .skilldrift.ai and the session
 * survives the hop from this site into the app. That continuity is what keeps
 * a signup attributed to the campaign that produced the click — giving the
 * marketing site its own property would break exactly that.
 *
 * The ID is hardcoded rather than read from the environment: it is public in
 * the page source either way, and a missing env var here would silently lose
 * attribution instead of failing loudly.
 *
 * This tag fires the first page_view itself. Every route here is a real
 * document load — there is no client-side router swapping pages under it — so
 * unlike the old SPA it needs no companion route tracker.
 */
export const GA_MEASUREMENT_ID = "G-JWVLXJXJTV";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}

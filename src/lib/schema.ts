import { getRoute } from "./content";
import { SITE_NAME, SITE_URL } from "./seo";

/** Appendix A3 — Organization. Emitted on every route from the root layout. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    "https://www.linkedin.com/company/skilldrift",
    "https://www.facebook.com/skilldriftindia",
    "https://www.instagram.com/skilldriftindia/",
    "https://www.youtube.com/@SkillDrift-AI",
  ],
} as const;

/**
 * Appendix A3 — SoftwareApplication, on `/` and `/pricing` only.
 *
 * The spec is explicit that the India and rest-of-world offer sets must never
 * both be emitted. `NEXT_PUBLIC_REGION=row` switches to the USD block.
 */
const OFFERS = {
  in: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "INR" },
    { "@type": "Offer", name: "Top up", price: "299", priceCurrency: "INR" },
    { "@type": "Offer", name: "Unlimited", price: "599", priceCurrency: "INR" },
  ],
  row: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Top up", price: "6.99", priceCurrency: "USD" },
    { "@type": "Offer", name: "Unlimited", price: "15.99", priceCurrency: "USD" },
  ],
} as const;

export function softwareApplicationSchema() {
  const region = process.env.NEXT_PUBLIC_REGION === "row" ? "row" : "in";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: SITE_URL,
    description:
      "AI career platform that scores your skills against a target role, builds the learning path that closes the gap, and matches you to jobs and internships.",
    offers: OFFERS[region],
  };
}

/**
 * Appendix A3 — FAQPage. Built from the questions actually rendered on the
 * page, so a JSON-LD answer can never exist without a visible counterpart.
 */
export function faqPageSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/**
 * Appendix A3 — BreadcrumbList. Feature pages sit under /features; every other
 * inner page hangs directly off the brand.
 */
export function breadcrumbSchema(path: string) {
  const route = getRoute(path);
  const items: { "@type": "ListItem"; position: number; name: string; item: string }[] =
    [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL }];

  if (route.feature) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "Features",
      item: `${SITE_URL}/features`,
    });
  }

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: route.breadcrumb ?? route.h1,
    item: `${SITE_URL}${path}`,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export function webPageSchema(path: string) {
  const route = getRoute(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title,
    description: route.description,
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    inLanguage: "en-IN",
  };
}

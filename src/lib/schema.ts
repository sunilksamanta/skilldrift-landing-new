import { getRoute } from "./content";
import {
  PRICES,
  PRICE_TOKENS,
  REGIONS,
  resolveRegionalText,
  type PriceToken,
} from "./region";
import { SITE_NAME, SITE_URL } from "./seo";

/**
 * Appendix A3 — Organization. Emitted on every route from the root layout, so
 * there is exactly one Organization entity for the site. The company facts on
 * `/about` are its visible counterpart, and `mainEntityOfPage` points there.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  // The registered Delaware name, exactly as Article I spells it: lowercase d,
  // no comma, one trailing period. The brand everywhere else is "SkillDrift".
  legalName: "Skilldrift Inc.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  foundingDate: "2025",
  areaServed: ["US", "IN", "SG"],
  mainEntityOfPage: `${SITE_URL}/about`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@skilldrift.ai",
    },
    {
      "@type": "ContactPoint",
      contactType: "press",
      email: "sales@skilldrift.ai",
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@skilldrift.ai",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/skilldrift",
    "https://www.facebook.com/skilldriftindia",
    "https://www.instagram.com/skilldriftindia/",
    "https://www.youtube.com/@SkillDrift-AI",
    "https://theresanaiforthat.com/ai/skilldrift/",
    "https://alternativeto.net/software/skilldrift/",
    "https://www.capterra.com/p/10166550/SkillDrift/",
    "https://www.getapp.com/all-software/a/skilldrift/",
    "https://www.softwareadvice.com/product/674176-SkillDrift/",
    "https://www.crunchbase.com/organization/skilldrift",
  ],
} as const;

/**
 * Appendix A3 — SoftwareApplication, on `/` and `/pricing` only.
 *
 * Appendix A3 said the India and rest-of-world offer sets must never both be
 * emitted, and that is deliberately no longer true. That rule assumed the
 * reader is a browser in a known country, where showing one price set is
 * right. Structured data has a different audience: Google's rich results and
 * the AI answer engines read it for price, and an answer engine fetches this
 * page from its own infrastructure, not from the user's country. Emitting one
 * currency therefore told every reader on earth the Indian price, no matter
 * who was asking.
 *
 * Both sets now ship, distinguished by `eligibleRegion`, which is the only
 * form that lets an answer engine say "₹299 in India, $6.99 elsewhere". The
 * *visible* page is unchanged: it still renders one currency per visitor.
 */
const CURRENCY = { in: "INR", row: "USD" } as const;

const PLAN_NAMES: Record<PriceToken, string> = {
  free: "Free",
  topup: "Top up",
  unlimited: "Unlimited",
};

/** Unlimited is a monthly subscription; the others are one-off. */
const RECURRING: Record<PriceToken, boolean> = {
  free: false,
  topup: false,
  unlimited: true,
};

const strip = (price: string) => price.replace(/[^0-9.]/g, "");

/**
 * One Offer per plan per currency, built from the same price table the pages
 * render, so the schema cannot drift from what a visitor is shown.
 *
 * The INR offers are scoped to India. The USD offers are left unscoped rather
 * than enumerating every other country: an Offer with no `eligibleRegion` is
 * the general case, which is exactly what "everywhere else" means.
 */
function offers() {
  return REGIONS.flatMap((region) =>
    PRICE_TOKENS.map((token) => {
      const price = strip(PRICES[region][token]);
      const priceCurrency = CURRENCY[region];

      return {
        "@type": "Offer",
        name: PLAN_NAMES[token],
        price,
        priceCurrency,
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        ...(region === "in"
          ? { eligibleRegion: { "@type": "Country", name: "India" } }
          : {}),
        // Without this, "Unlimited $15.99" reads as a one-time purchase.
        ...(RECURRING[token]
          ? {
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price,
                priceCurrency,
                billingDuration: 1,
                billingIncrement: 1,
                unitCode: "MON",
              },
            }
          : {}),
      };
    }),
  );
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    // Distinct @id and publisher: one company, two products. The institutional
    // product lives at https://www.skilldrift.org/#career-launchpad and points
    // its publisher at the same Organization node. Never add skilldrift.org to
    // this site's `sameAs` — sameAs means "the same entity", and that would
    // re-conflate the two products from this side.
    "@id": `${SITE_URL}/#skilldrift`,
    name: SITE_NAME,
    publisher: { "@id": "https://www.skilldrift.org/#organization" },
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: SITE_URL,
    description:
      "AI career platform that scores your skills against a target role, builds the learning path that closes the gap, and matches you to jobs and internships.",
    offers: offers(),
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
      acceptedAnswer: { "@type": "Answer", text: resolveRegionalText(faq.a) },
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
    inLanguage: "en",
  };
}

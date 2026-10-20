"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "./icons";
import { Pill, SectionIntro } from "./SectionBits";
import TrackedLink from "./TrackedLink";
import { FEATURE_ROUTES, ctaLabelFor } from "@/lib/content";

/**
 * The same seven feature pages `/features` shows, read from `pages.json`
 * rather than re-listed here — so the homepage and the features page can never
 * disagree about which tools exist or how many there are.
 *
 * `/jobs` is deliberately absent: it is not one of the seven feature pages, and
 * it is reachable from the header nav on every page.
 */
const features = FEATURE_ROUTES.map((route, i) => {
  const label = route.breadcrumb ?? route.h1;
  return {
    n: String(i + 1).padStart(2, "0"),
    kicker: label,
    title: route.h1,
    body: route.hero?.standfirst ?? route.description,
    cta: `See ${label.toLowerCase()}`,
    href: route.path,
    /** What this card reports as its CTA label. */
    slug: ctaLabelFor(route),
    image: route.hero?.image,
    alt: route.hero?.imageAlt ?? "",
  };
});

export default function FeaturesSection() {
  const [open, setOpen] = useState(0);
  const active = features[open];

  return (
    <section id="features" className="sect sect--alt">
      <div className="wrap">
        <Pill>Everything in the loop</Pill>
        <SectionIntro
          align="start"
          heading="Seven powerful tools, seamlessly connected in one unified system."
          copy="Every tool feeds into one connected profile, one growing score, and one resume that gets stronger with every skill you build. Each links to its own page."
        />

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(400px,100%),1fr))",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {features.map((feature, i) => {
              const on = open === i;
              return (
                <div
                  key={feature.n}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    padding: "22px 0 22px 24px",
                    borderLeft: on
                      ? "2px solid var(--ac)"
                      : "1px solid var(--line2)",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`feature-panel-${feature.n}`}
                    onClick={() => setOpen(i)}
                    style={{
                      textAlign: "left",
                      color: "var(--tx)",
                      background: "transparent",
                      border: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        gap: 12,
                        fontSize: 14,
                        color: "var(--tx3)",
                      }}
                    >
                      <span>{feature.n}</span>
                      <span style={{ color: "var(--ac)" }}>{feature.kicker}</span>
                    </span>
                    <span
                      style={{
                        display: "block",
                        marginTop: 10,
                        fontSize: 22,
                        fontWeight: 600,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {feature.title}
                    </span>
                  </button>

                  <div
                    id={`feature-panel-${feature.n}`}
                    style={{ display: on ? "block" : "none" }}
                  >
                    <p
                      style={{
                        paddingTop: 16,
                        fontSize: 15,
                        lineHeight: 1.62,
                        color: "var(--tx2)",
                      }}
                    >
                      {feature.body}
                    </p>
                    <TrackedLink
                      href={feature.href}
                      section="feature_grid"
                      label={feature.slug}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 9,
                        marginTop: 20,
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--tx)",
                      }}
                    >
                      {feature.cta}
                      <ArrowRight size={16} />
                    </TrackedLink>
                  </div>
                </div>
              );
            })}
          </div>

          {/* The artwork already carries the purple field and grid, so it needs
              no frame of its own — only a matching radius. */}
          {active.image && (
            <TrackedLink
              href={active.href}
              section="feature_grid"
              label={active.slug}
              ariaLabel={active.cta}
              style={{
                display: "block",
                position: "relative",
                width: "100%",
                aspectRatio: "1800 / 1290",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 30px 70px rgba(20,10,60,.28)",
              }}
            >
              <Image
                key={active.image}
                src={active.image}
                alt={active.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </TrackedLink>
          )}
        </div>
      </div>
    </section>
  );
}

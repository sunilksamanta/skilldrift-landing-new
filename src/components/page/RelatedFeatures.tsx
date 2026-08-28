import { ArrowRight } from "../icons";
import TrackedLink from "../TrackedLink";
import { FEATURE_ROUTES, ctaLabelFor } from "@/lib/content";

/**
 * Internal linking between the seven feature pages. Every feature page links to
 * the other six, which is what stops them being crawl islands.
 */
export default function RelatedFeatures({ current }: { current: string }) {
  const others = FEATURE_ROUTES.filter((route) => route.path !== current);

  return (
    <section className="sect sect--alt" aria-labelledby="related-heading">
      <div className="wrap">
        <h2
          id="related-heading"
          style={{
            fontSize: "clamp(24px,2.4vw,32px)",
            lineHeight: 1.15,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          The rest of the loop
        </h2>
        <p
          style={{
            marginTop: 12,
            maxWidth: 620,
            fontSize: 16,
            lineHeight: 1.62,
            color: "var(--tx2)",
          }}
        >
          Every tool feeds one connected profile, one growing score, and one resume
          that gets stronger with every skill you build.
        </p>

        <div
          style={{
            marginTop: 36,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))",
            gap: 16,
          }}
        >
          {others.map((route) => {
            return (
              <TrackedLink
                key={route.path}
                href={route.path}
                section="related_features"
                label={ctaLabelFor(route)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: "24px 26px",
                  borderRadius: 16,
                  border: "1px solid var(--line)",
                  background: "var(--card)",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ac)",
                  }}
                >
                  {route.breadcrumb}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                  }}
                >
                  {route.h1}
                </span>
                <span
                  style={{
                    marginTop: "auto",
                    paddingTop: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    color: "var(--ac)",
                  }}
                >
                  Read more
                  <ArrowRight size={15} strokeWidth={2} />
                </span>
              </TrackedLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}

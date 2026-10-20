import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "../icons";
import { FEATURE_ROUTES } from "@/lib/content";

/**
 * The /features showcase: one full-width row per feature page, alternating the
 * media side. Copy is read from `pages.json` rather than duplicated, so a
 * feature page and its row can never disagree.
 */
export default function FeatureRows() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FEATURE_ROUTES.map((route, i) => {
        const flip = i % 2 === 1;
        const n = String(i + 1).padStart(2, "0");
        const label = route.breadcrumb ?? route.h1;

        return (
          <section
            key={route.path}
            className={i % 2 === 1 ? "sect sect--alt" : "sect"}
            aria-labelledby={`feature-${n}`}
          >
            <div className="wrap">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(400px,100%),1fr))",
                  gap: 64,
                  alignItems: "center",
                }}
              >
                <div style={{ order: flip ? 2 : 1 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: 13,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span style={{ color: "var(--tx3)" }}>{n}</span>
                    <span style={{ color: "var(--ac)" }}>{label}</span>
                  </span>

                  <h2
                    id={`feature-${n}`}
                    style={{
                      marginTop: 16,
                      fontSize: "clamp(26px,2.9vw,40px)",
                      lineHeight: 1.14,
                      fontWeight: 600,
                      letterSpacing: "-0.025em",
                      maxWidth: 520,
                    }}
                  >
                    {route.h1}
                  </h2>

                  <p
                    style={{
                      marginTop: 18,
                      maxWidth: 540,
                      fontSize: 16.5,
                      lineHeight: 1.62,
                      color: "var(--tx2)",
                    }}
                  >
                    {route.hero?.standfirst}
                  </p>

                  <Link
                    href={route.path}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 26,
                      height: 50,
                      padding: "0 24px",
                      borderRadius: 12,
                      border: "1px solid var(--line2)",
                      fontSize: 15.5,
                      fontWeight: 500,
                      color: "var(--tx)",
                    }}
                  >
                    See {label.toLowerCase()}
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div style={{ order: flip ? 1 : 2 }}>
                  {route.hero?.image ? (
                    <Link
                      href={route.path}
                      aria-label={`See ${label.toLowerCase()}`}
                      style={{
                        display: "block",
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1800 / 1290",
                        borderRadius: 22,
                        overflow: "hidden",
                        boxShadow: "0 30px 70px rgba(20,10,60,.30)",
                      }}
                    >
                      <Image
                        src={route.hero.image}
                        alt={route.hero.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 1000px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  ) : (
                    <FeaturePanel n={n} label={label} />
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/**
 * Stands in until a product shot exists for this feature. Deliberately designed
 * rather than a grey box, so the row reads as finished either way.
 */
function FeaturePanel({ n, label }: { n: string; label: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1800 / 1290",
        borderRadius: 22,
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#6A55C8",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px),linear-gradient(160deg,#7B63E0,#5B49B6 62%,#4A3C99)",
        backgroundSize: "74px 74px, 74px 74px, 100% 100%",
        boxShadow: "0 30px 70px rgba(20,10,60,.30)",
      }}
    >
      <div style={{ textAlign: "center", padding: 32 }}>
        <div
          style={{
            fontSize: "clamp(52px,7vw,96px)",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,.28)",
          }}
        >
          {n}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 17,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,.92)",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

/**
 * Visible counterpart to the BreadcrumbList JSON-LD. Structured data that has
 * no on-page equivalent is a Google violation, so these ship together.
 */
export default function Breadcrumbs({
  trail,
}: {
  trail: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="wrap" style={{ paddingTop: 26 }}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          fontSize: 13.5,
          color: "var(--tx3)",
        }}
      >
        {trail.map((crumb, i) => (
          <li key={crumb.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {i > 0 && (
              <span aria-hidden="true" style={{ color: "var(--tx3)" }}>
                /
              </span>
            )}
            {crumb.href ? (
              <Link href={crumb.href} style={{ color: "var(--tx2)" }}>
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: "var(--tx)" }}>
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

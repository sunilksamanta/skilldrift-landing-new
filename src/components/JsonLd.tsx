/**
 * Renders one or more schema.org blocks. Each object gets its own script tag —
 * search engines parse them independently, and a malformed block then cannot
 * take the rest down with it.
 */
export default function JsonLd({ schemas }: { schemas: object[] }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

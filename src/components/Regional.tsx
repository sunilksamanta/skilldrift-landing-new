import type { ReactNode } from "react";
import { PRICES, REGIONS, type PriceToken, type Region } from "@/lib/region";

/**
 * Both regional variants are rendered; CSS shows the one that matches
 * `<html data-sd-region>`. Server components can use this freely — there is no
 * hook, no hydration boundary, and no flash of the wrong currency.
 */
export function Regional({
  in: inNode,
  row: rowNode,
}: {
  in: ReactNode;
  row: ReactNode;
}) {
  return (
    <>
      <span data-sd-region-only="in">{inNode}</span>
      <span data-sd-region-only="row">{rowNode}</span>
    </>
  );
}

/** One price, in whichever currency the visitor is being shown. */
export function Price({ kind }: { kind: PriceToken }) {
  return (
    <>
      {REGIONS.map((region: Region) => (
        <span key={region} data-sd-region-only={region}>
          {PRICES[region][kind]}
        </span>
      ))}
    </>
  );
}

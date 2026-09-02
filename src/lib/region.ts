/**
 * Where the visitor is, and what that means for money.
 *
 * India is the primary market and the only place where the credit/currency
 * mapping ("one credit is one rupee") is true, so every price and every line of
 * copy that leans on that mapping has a rest-of-world counterpart.
 *
 * Detection is by **time zone**, resolved in the browser before first paint by
 * the bootstrap script in the root layout — see `regionBootstrap` below. The
 * result lands on `<html data-sd-region>`, and both variants of every regional
 * string are rendered with only one of them shown by CSS. That keeps this
 * working on a fully static, CDN-cached site: nothing has to be server-rendered
 * per visitor, and there is no flash of the wrong currency.
 *
 * `NEXT_PUBLIC_REGION` sets the *build-time* default, which is rest-of-world
 * unless it is explicitly `in`. The default is what a crawler with no JS sees
 * (Google, every AI crawler) and what the FAQ JSON-LD and page metadata use,
 * since none of those can vary per visitor on a static page. Rest-of-world is
 * the honest answer for an audience that is not in any one time zone; an Indian
 * visitor in a browser still gets rupees from the bootstrap before first paint.
 */

export type Region = "in" | "row";

export const DEFAULT_REGION: Region =
  process.env.NEXT_PUBLIC_REGION === "in" ? "in" : "row";

export type PriceToken = "free" | "topup" | "unlimited";

/** The credit pack every "top up" price refers to. Same size in both regions. */
export const PACK_CREDITS = 299;

export const PRICES: Record<Region, Record<PriceToken, string>> = {
  in: { free: "₹0", topup: "₹299", unlimited: "₹599" },
  row: { free: "$0", topup: "$6.99", unlimited: "$15.99" },
};

export const PRICE_TOKENS = Object.keys(PRICES.in) as PriceToken[];

export const REGIONS: Region[] = ["in", "row"];

/** Time zones that mean India. Older ICU builds still report Asia/Calcutta. */
const IN_TIME_ZONES = ["Asia/Kolkata", "Asia/Calcutta"];

/**
 * Runs in `<head>` before first paint, so the right currency is on screen from
 * the very first frame. `?region=in|row` overrides and persists, which is the
 * only way to check the other region from a desk in the wrong time zone.
 */
export const regionBootstrap = `(function(){try{
var q=new URLSearchParams(location.search).get("region");
if(q==="in"||q==="row"){localStorage.setItem("sd-region",q)}
var s=localStorage.getItem("sd-region");
var r=(s==="in"||s==="row")?s:(${JSON.stringify(IN_TIME_ZONES)}.indexOf(
  (Intl.DateTimeFormat().resolvedOptions().timeZone||""))>-1?"in":"row");
document.documentElement.dataset.sdRegion=r;
}catch(e){}})()`;

/**
 * Collapses the authoring tokens down to one region's text.
 *
 * Only for places that cannot render both variants — page metadata, JSON-LD,
 * OG images — where the build-time default is the honest answer.
 */
export function resolveRegionalText(text: string, region: Region = DEFAULT_REGION) {
  return text
    .replace(/\{\{([\s\S]*?)\|([\s\S]*?)\}\}/g, (_, inText, rowText) =>
      region === "in" ? inText : rowText,
    )
    .replace(/\{(free|topup|unlimited)\}/g, (whole, token: PriceToken) =>
      PRICES[region][token] ?? whole,
    );
}

/**
 * Shape of `pages.json`. Every marketing route is described here as data; the
 * renderer in `src/components/page/BlockRenderer.tsx` turns it into the shared
 * layout at build time. Adding a page means adding an entry, not writing JSX.
 *
 * Copy fields accept inline links in `[label](/href)` form.
 */

export type Cta = { label: string; href: string };

export type CardBlock = {
  type: "cards";
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  heading: string;
  copy?: string;
  /** Minimum card width before the grid wraps. Default 300. */
  min?: number;
  cards: { tag?: string; title: string; body: string; accent?: boolean }[];
};

export type StepsBlock = {
  type: "steps";
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  heading: string;
  copy?: string;
  steps: { title: string; body: string }[];
};

export type SplitBlock = {
  type: "split";
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  heading: string;
  copy?: string;
  panels: {
    title: string;
    body?: string;
    items?: string[];
    accent?: boolean;
  }[];
};

export type PricesBlock = {
  type: "prices";
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  heading: string;
  copy?: string;
  rows: { label: string; note?: string; cost: string }[];
  note?: string;
};

export type StatsBlock = {
  type: "stats";
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  heading: string;
  copy?: string;
  stats: { value: string; label: string }[];
};

export type ProseBlock = {
  type: "prose";
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  heading: string;
  copy?: string;
  paragraphs: string[];
};

export type ContactBlock = {
  type: "contact";
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  heading: string;
  copy?: string;
  channels: { label: string; value: string; href: string; note?: string }[];
};

/** Renders the three real plan cards — Free, Top up, Unlimited. */
export type PlansBlock = {
  type: "plans";
  id?: string;
  alt?: boolean;
  eyebrow?: string;
  heading: string;
  copy?: string;
};

/** Renders every feature page as an alternating showcase row. */
export type FeatureRowsBlock = {
  type: "featureRows";
  id?: string;
};

export type Block =
  | CardBlock
  | StepsBlock
  | SplitBlock
  | PricesBlock
  | StatsBlock
  | ProseBlock
  | ContactBlock
  | FeatureRowsBlock
  | PlansBlock;

export type RouteContent = {
  path: string;
  /** Appendix A2 strings — literal, never templated. */
  title: string;
  description: string;
  h1: string;
  /** Sitemap weight, Appendix A4. */
  priority: number;
  /** Crumb label and eyebrow. Falls back to the H1. */
  breadcrumb?: string;
  /** The homepage is hand-built; it carries meta only. */
  custom?: boolean;
  /** True for the seven pages that sit under Features. */
  feature?: boolean;
  hero?: {
    eyebrow: string;
    standfirst: string;
    primaryCta?: Cta;
    secondaryCta?: Cta;
    /** Product shot shown beside the hero copy. Already carries its own field. */
    image?: string;
    imageAlt?: string;
  };
  sections?: Block[];
  cta?: {
    heading: string;
    copy: string;
    primary?: Cta;
    secondary?: Cta;
    note?: string;
  };
};

export type PagesFile = { routes: RouteContent[] };

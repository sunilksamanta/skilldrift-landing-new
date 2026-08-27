import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import BlockRenderer from "@/components/page/BlockRenderer";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import CtaBand from "@/components/page/CtaBand";
import PageHero from "@/components/page/PageHero";
import RelatedFeatures from "@/components/page/RelatedFeatures";
import { CONTENT_ROUTES, getRouteBySlug } from "@/lib/content";
import { breadcrumbSchema, softwareApplicationSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { campaignFor } from "@/lib/cta";

/** Only the slugs in pages.json exist; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return CONTENT_ROUTES.map((route) => ({ slug: route.path.replace(/^\//, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return {};
  return buildMetadata(route.path);
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route || !route.hero) notFound();

  const schemas: object[] = [webPageSchema(route.path), breadcrumbSchema(route.path)];
  if (route.path === "/pricing") schemas.push(softwareApplicationSchema());

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--tx)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <JsonLd schemas={schemas} />
      <SiteHeader campaign={campaignFor(route.path)} />

      <main>
        <Breadcrumbs
          trail={[
            { name: "SkillDrift", href: "/" },
            ...(route.feature ? [{ name: "Features", href: "/features" }] : []),
            { name: route.breadcrumb ?? route.h1 },
          ]}
        />

        <PageHero
          eyebrow={route.hero.eyebrow}
          h1={route.h1}
          standfirst={route.hero.standfirst}
          primaryCta={route.hero.primaryCta}
          secondaryCta={route.hero.secondaryCta}
          image={route.hero.image}
          imageAlt={route.hero.imageAlt}
          campaign={campaignFor(route.path)}
        />

        {route.sections?.map((block, i) => (
          <BlockRenderer
            key={block.id ?? `${block.type}-${i}`}
            block={block}
            campaign={campaignFor(route.path)}
          />
        ))}

        {route.feature && <RelatedFeatures current={route.path} />}

        {route.cta && (
          <CtaBand
            heading={route.cta.heading}
            copy={route.cta.copy}
            primary={route.cta.primary}
            secondary={route.cta.secondary}
            note={route.cta.note}
            campaign={campaignFor(route.path)}
          />
        )}
      </main>

      <SiteFooter campaign={campaignFor(route.path)} />
    </div>
  );
}

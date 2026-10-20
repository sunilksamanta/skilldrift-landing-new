// app/skills/in-demand/[slug]/page.tsx
//
// One indexable page per slice of the job index, e.g.
// https://www.skilldrift.ai/skills/in-demand/engineering-jobs-in-fintech
// Data comes from lib/skillsDemand.ts. Styling copies app/skills/[role]/page.tsx
// (same CSS variables, same .wrap / .sect / .sect--alt classes, same upload card).
//
// The root layout does not render the site chrome, so this page renders
// SiteHeader and SiteFooter itself, like app/skills/[role].

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';
import ResumeUploadCard from "@/components/ResumeUploadCard";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { campaignFor } from "@/lib/cta";
import { DEMAND_PAGES, SNAPSHOT_DATE, SNAPSHOT_LABEL, getDemandPage, sameIndustry, sameRole } from '@/lib/skillsDemand';

const SITE = 'https://www.skilldrift.ai';
export const dynamicParams = false;

const PILL: CSSProperties = { display: 'inline-block', padding: '9px 20px', borderRadius: 999, border: '1px solid var(--acline)', fontSize: 14 };
const H2: CSSProperties = { fontSize: 'clamp(28px,3.1vw,44px)', lineHeight: 1.13, fontWeight: 600, letterSpacing: '-0.025em' };
const LEAD: CSSProperties = { marginTop: 18, maxWidth: 760, fontSize: 16, lineHeight: 1.62, color: 'var(--tx2)' };
const LINK: CSSProperties = { color: 'var(--tx)', textDecoration: 'underline', textUnderlineOffset: 3 };
const ROW: CSSProperties = { display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center', gap: '6px 20px', padding: '18px 0', borderBottom: '1px solid var(--line)' };

function Sect({ alt, children }: { alt: boolean; children: ReactNode }) {
  return (
    <section className={alt ? 'sect sect--alt' : 'sect'}>
      <div className="wrap">{children}</div>
    </section>
  );
}

const fmt = (n: number) => n.toLocaleString('en-US');
const pct = (p: number) => `${Number.isInteger(p) ? p : p.toFixed(1)}%`;

export function generateStaticParams() {
  return DEMAND_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getDemandPage(slug);
  if (!p) return {};
  const url = `${SITE}/skills/in-demand/${p.slug}`;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { type: 'website', siteName: 'SkillDrift', locale: 'en_US', title: p.title, description: p.description, url },
    twitter: { card: 'summary_large_image', title: p.title, description: p.description },
  };
}

export default async function SkillsDemandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getDemandPage(slug);
  if (!p) notFound();
  const url = `${SITE}/skills/in-demand/${p.slug}`;
  const campaign = campaignFor(`/skills/in-demand/${p.slug}`);
  const top = p.skills[0];
  const others = sameRole(p).slice(0, 6);
  const neighbours = sameIndustry(p).slice(0, 6);

  const faqs = [
    {
      q: `What is the most requested skill in ${p.where}?`,
      a: `${top.name}. It is named in ${pct(top.pct)} of the ${fmt(p.sample)} ${p.where} in the SkillDrift job index on ${SNAPSHOT_LABEL}.`,
    },
    {
      q: 'How many job postings is this based on?',
      a: `${fmt(p.sample)} postings, read from the SkillDrift job index on ${SNAPSHOT_LABEL}. Each share is the number of postings that name the skill, divided by all postings in this group.`,
    },
  ];

  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: p.title, description: p.description, url, isPartOf: { '@type': 'WebSite', name: 'SkillDrift', url: SITE }, inLanguage: 'en', dateModified: SNAPSHOT_DATE },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SkillDrift', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Skills by role', item: `${SITE}/skills` },
        { '@type': 'ListItem', position: 3, name: 'Skills in demand', item: `${SITE}/skills/in-demand` },
        { '@type': 'ListItem', position: 4, name: p.h1, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: p.h1,
      description: `Share of ${p.where} that name each skill, from ${fmt(p.sample)} postings in the SkillDrift job index.`,
      url,
      dateModified: SNAPSHOT_DATE,
      creator: { '@type': 'Organization', name: 'SkillDrift', url: SITE },
      variableMeasured: p.skills.map((s) => ({ '@type': 'PropertyValue', name: s.name, value: s.pct, unitText: 'percent of postings' })),
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--tx)', minHeight: '100vh', overflowX: 'hidden' }}>
      <SiteHeader campaign={campaign} />
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <main>
        <nav aria-label="Breadcrumb" className="wrap" style={{ paddingTop: 26 }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--tx3)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Link href="/" style={{ color: 'var(--tx2)' }}>SkillDrift</Link></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true">/</span><Link href="/skills" style={{ color: 'var(--tx2)' }}>Skills by role</Link></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true">/</span><Link href="/skills/in-demand" style={{ color: 'var(--tx2)' }}>Skills in demand</Link></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true">/</span><span aria-current="page" style={{ color: 'var(--tx)' }}>{p.industryLabel ? `${p.roleTitle} in ${p.industryLabel}` : p.roleTitle}</span></li>
          </ol>
        </nav>

        <section style={{ padding: '28px 0 8px' }}>
          <div className="wrap">
            <h1 style={{ maxWidth: 920, fontSize: 'clamp(34px,4vw,56px)', lineHeight: 1.08, fontWeight: 600, letterSpacing: '-0.025em' }}>{p.h1}</h1>
            <p style={{ marginTop: 24, maxWidth: 740, fontSize: 17, lineHeight: 1.62, color: 'var(--tx2)' }}>{p.answer}</p>
            <p style={{ marginTop: 14, maxWidth: 740, fontSize: 14.5, lineHeight: 1.6, color: 'var(--tx3)' }}>
              Based on {fmt(p.sample)} job postings in the SkillDrift job index, read on {SNAPSHOT_LABEL}.
            </p>
          </div>
        </section>

        <Sect alt={true}>
          <span style={PILL}>Most requested</span>
          <h2 style={{ ...H2, marginTop: 26, maxWidth: 900 }}>The {p.skills.length} skills named most often</h2>
          <p style={LEAD}>Each share is the part of all {p.where} that name the skill. One posting usually names several skills, so the shares add up to more than 100%.</p>
          <ol style={{ marginTop: 32, maxWidth: 860, listStyle: 'none', padding: 0 }}>
            {p.skills.map((s, i) => (
              <li key={s.name} style={ROW}>
                <span style={{ fontSize: 17, fontWeight: 500 }}>
                  <span style={{ color: 'var(--tx3)', marginRight: 12 }}>{i + 1}</span>
                  {s.name}
                </span>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{pct(s.pct)}</span>
                <span aria-hidden="true" style={{ gridColumn: '1 / -1', height: 6, borderRadius: 999, background: 'var(--line)', overflow: 'hidden' }}>
                  <span style={{ display: 'block', height: '100%', width: `${s.pct}%`, borderRadius: 999, background: 'var(--ac, #7c5df9)' }} />
                </span>
                <span style={{ gridColumn: '1 / -1', fontSize: 13.5, color: 'var(--tx3)' }}>{fmt(s.count)} of {fmt(p.sample)} postings</span>
              </li>
            ))}
          </ol>
          <p style={{ ...LEAD, marginTop: 28 }}>
            Which of these does your resume show? Upload it below. SkillDrift reads it against a real job, names the skills it does not show yet, and builds a plan to close them.
          </p>
        </Sect>

        <ResumeUploadCard campaign={campaign} />

        <Sect alt={true}>
          <span style={PILL}>How to read this</span>
          <h2 style={{ ...H2, marginTop: 26, maxWidth: 900 }}>Where these numbers come from</h2>
          <p style={LEAD}>
            The SkillDrift job index collects live job postings and reads the skills each one asks for. This page counts the postings
            in the {p.roleLabel} role group{p.industryLabel ? ` within the ${p.industryLabel} industry` : ', across all industries'}, and
            shows the share that name each skill. Skills appear as employers write them, so close variants such as Excel and MS Excel can
            both appear, because a posting may use either. The page is refreshed from the index, and the date above shows the last read.
          </p>
        </Sect>

        <Sect alt={false}>
          <span style={PILL}>FAQ</span>
          <div style={{ marginTop: 26 }}><h2 style={{ ...H2, maxWidth: 900 }}>Questions people ask</h2></div>
          <div style={{ marginTop: 40 }}>
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} style={{ borderBottom: '1px solid var(--line)' }}>
                <summary style={{ listStyle: 'none', cursor: 'pointer', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, fontSize: 19, fontWeight: 500 }}>
                  {f.q}
                  <span style={{ flex: '0 0 auto', color: 'var(--tx2)' }}>
                    <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" viewBox="0 0 24 24" width="20"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </summary>
                <p style={{ padding: '0 0 24px', maxWidth: 820, fontSize: 16, lineHeight: 1.68, color: 'var(--tx2)' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </Sect>

        <Sect alt={true}>
          <span style={PILL}>Further reading</span>
          <h2 style={{ ...H2, marginTop: 26 }}>Keep going</h2>
          <ul style={{ marginTop: 28, fontSize: 16, color: 'var(--tx2)' }}>
            {p.guides.map((g) => (
              <li key={g.href} style={{ marginTop: 12 }}><Link href={g.href} style={LINK}>{g.label}: the full guide</Link></li>
            ))}
            {others.map((q) => (
              <li key={q.slug} style={{ marginTop: 12 }}><Link href={`/skills/in-demand/${q.slug}`} style={LINK}>Skills in {q.where}</Link></li>
            ))}
            {neighbours.map((q) => (
              <li key={q.slug} style={{ marginTop: 12 }}><Link href={`/skills/in-demand/${q.slug}`} style={LINK}>Skills in {q.where}</Link></li>
            ))}
            <li style={{ marginTop: 12 }}><Link href="/skills/in-demand" style={LINK}>All roles and industries</Link></li>
          </ul>
        </Sect>
      </main>
      <SiteFooter campaign={campaign} />
    </div>
  );
}

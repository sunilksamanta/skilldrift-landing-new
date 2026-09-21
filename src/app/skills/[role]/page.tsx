// app/skills/[role]/page.tsx
//
// One indexable page per role, e.g. https://www.skilldrift.ai/skills/software-engineer
// Content comes from lib/roles.ts. Styling copies app/ats-score-checker exactly
// (same inline styles, same CSS variables, same .wrap / .sect / .sect--alt classes).
//
// The root layout does not render the site chrome, so, like app/ats-score-checker,
// this page renders SiteHeader and SiteFooter itself.

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';
import RoleHero from "@/components/RoleHero";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { campaignFor } from "@/lib/cta";
import { LIVE_ROLES, getRole } from '@/lib/roles';

const SITE = 'https://www.skilldrift.ai';
export const dynamicParams = false;

const PILL: CSSProperties = { display: 'inline-block', padding: '9px 20px', borderRadius: 999, border: '1px solid var(--acline)', fontSize: 14 };
const H2: CSSProperties = { fontSize: 'clamp(28px,3.1vw,44px)', lineHeight: 1.13, fontWeight: 600, letterSpacing: '-0.025em' };
const HEADGRID: CSSProperties = { marginTop: 26, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 48, alignItems: 'end' };
const LEAD: CSSProperties = { fontSize: 16, lineHeight: 1.62, color: 'var(--tx2)' };
const CARDS: CSSProperties = { marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap: 20 };
const CARD: CSSProperties = { padding: 28, borderRadius: 18, border: '1px solid var(--line)', background: 'var(--card)' };
const H3: CSSProperties = { marginTop: 0, fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' };
const CP: CSSProperties = { marginTop: 10, fontSize: 15, lineHeight: 1.6, color: 'var(--tx2)' };
const LINK: CSSProperties = { color: 'var(--tx)', textDecoration: 'underline', textUnderlineOffset: 3 };

function Head({ pill, title, lead }: { pill: string; title: string; lead?: string }) {
  return (
    <>
      <span style={PILL}>{pill}</span>
      <div style={HEADGRID}>
        <h2 style={H2}>{title}</h2>
        {lead ? <p style={LEAD}>{lead}</p> : null}
      </div>
    </>
  );
}
function Cards({ items }: { items: { h: string; b: string }[] }) {
  return (
    <div style={CARDS}>
      {items.map((x) => (
        <div key={x.h} style={CARD}>
          <h3 style={H3}>{x.h}</h3>
          <p style={CP}>{x.b}</p>
        </div>
      ))}
    </div>
  );
}
function Sect({ alt, children }: { alt: boolean; children: ReactNode }) {
  return (
    <section className={alt ? 'sect sect--alt' : 'sect'}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function generateStaticParams() {
  return LIVE_ROLES.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role: slug } = await params;
  const r = getRole(slug);
  if (!r) return {};
  const url = `${SITE}/skills/${r.slug}`;
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { type: 'website', siteName: 'SkillDrift', locale: 'en_US', title: r.title, description: r.description, url },
    twitter: { card: 'summary_large_image', title: r.title, description: r.description },
  };
}

export default async function RoleSkillsPage({ params }: { params: Promise<{ role: string }> }) {
  const { role: slug } = await params;
  const r = getRole(slug);
  if (!r) notFound();
  const url = `${SITE}/skills/${r.slug}`;
  const campaign = campaignFor(`/skills/${r.slug}`);
  const n = r.groups.length;

  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: r.title, description: r.description, url, isPartOf: { '@type': 'WebSite', name: 'SkillDrift', url: SITE }, inLanguage: 'en' },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SkillDrift', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Skills by role', item: `${SITE}/skills` },
        { '@type': 'ListItem', position: 3, name: r.roleTitle, item: url },
      ],
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: r.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--tx)', minHeight: '100vh', overflowX: 'hidden' }}>
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <SiteHeader campaign={campaign} />
      <main>
        <nav aria-label="Breadcrumb" className="wrap" style={{ paddingTop: 26 }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--tx3)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Link href="/" style={{ color: 'var(--tx2)' }}>SkillDrift</Link></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" style={{ color: 'var(--tx3)' }}>/</span><Link href="/skills" style={{ color: 'var(--tx2)' }}>Skills by role</Link></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span aria-hidden="true" style={{ color: 'var(--tx3)' }}>/</span><span aria-current="page" style={{ color: 'var(--tx)' }}>{r.roleTitle}</span></li>
          </ol>
        </nav>

        <RoleHero h1={r.h1} answer={r.answer} intro={r.intro} role={r.role} campaign={campaign} />

        {r.groups.map((g, i) => (
          <Sect key={g.heading} alt={i % 2 === 0}>
            <Head pill={g.kind === 'technical' ? 'Technical skills' : 'Human skills'} title={g.heading} />
            <Cards items={g.skills.map((s) => ({ h: s.name, b: s.why }))} />
          </Sect>
        ))}

        <Sect alt={n % 2 === 0}>
          <Head pill="What decides the offer" title={r.decidesHeading} lead="Most people who reach the interview have the core list. These are the skills that usually separate them." />
          <Cards items={r.decides.map((d) => ({ h: d.heading, b: d.body }))} />
        </Sect>

        <Sect alt={n % 2 === 1}>
          <Head pill="On your resume" title="How to show these skills on your resume" lead={r.resume.note} />
          <Cards items={[{ h: 'Before', b: r.resume.before }, { h: 'After', b: r.resume.after }]} />
          <p style={{ marginTop: 32, fontSize: 15.5, color: 'var(--tx2)' }}>
            See how a screening system reads your resume with the <Link href="/ats-score-checker" style={LINK}>ATS score checker</Link>, then turn the gaps into a plan with a <Link href="/career-roadmap" style={LINK}>career roadmap</Link>.
          </p>
        </Sect>

        <Sect alt={n % 2 === 0}>
          <Head pill="By title" title={r.variants.heading} lead={r.variants.body} />
        </Sect>

        <Sect alt={n % 2 === 1}>
          <span style={PILL}>FAQ</span>
          <div style={{ marginTop: 26 }}><h2 style={{ ...H2, maxWidth: 900 }}>Questions people ask</h2></div>
          <div style={{ marginTop: 52 }}>
            {r.faqs.map((f, i) => (
              <details key={f.q} open={i === 0} style={{ borderBottom: '1px solid var(--line)' }}>
                <summary style={{ listStyle: 'none', cursor: 'pointer', padding: '26px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, fontSize: 19, fontWeight: 500 }}>
                  {f.q}
                  <span style={{ flex: '0 0 auto', color: 'var(--tx2)' }}>
                    <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" viewBox="0 0 24 24" width="20"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </summary>
                <p style={{ padding: '0 0 26px', maxWidth: 820, fontSize: 16, lineHeight: 1.68, color: 'var(--tx2)' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </Sect>

        <Sect alt={n % 2 === 0}>
          <Head pill="Further reading" title="Keep going" />
          <ul style={{ marginTop: 32, fontSize: 16, color: 'var(--tx2)' }}>
            {r.related.map((l) => (
              <li key={l.href} style={{ marginTop: 12 }}><a href={l.href} style={LINK}>{l.label}</a></li>
            ))}
            <li style={{ marginTop: 12 }}><Link href="/skills" style={LINK}>Skills needed for other roles</Link></li>
          </ul>
          <p style={{ marginTop: 40, fontSize: 15.5, color: 'var(--tx2)' }}>
            Ready when you are: <a href="#top" style={LINK}>upload your resume and see your {r.role} gaps</a>.
          </p>
        </Sect>
      </main>
      <SiteFooter campaign={campaign} />
    </div>
  );
}

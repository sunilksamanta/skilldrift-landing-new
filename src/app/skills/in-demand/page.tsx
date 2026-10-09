// app/skills/in-demand/page.tsx  The hub: https://www.skilldrift.ai/skills/in-demand
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { campaignFor } from "@/lib/cta";
import { DEMAND_PAGES, SNAPSHOT_LABEL } from '@/lib/skillsDemand';

const URL = 'https://www.skilldrift.ai/skills/in-demand';
const TITLE = 'Skills in Demand by Role and Industry, October 2026 | SkillDrift';
const DESCRIPTION =
  'The skills employers name most often in live job postings, by role and by industry. Engineering, data and AI, sales, marketing, finance, design, HR and more.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', siteName: 'SkillDrift', locale: 'en_US', title: TITLE, description: DESCRIPTION, url: URL },
};

const fmt = (n: number) => n.toLocaleString('en-US');

export default function SkillsDemandHub() {
  const campaign = campaignFor('/skills/in-demand');
  const groups = new Map<string, typeof DEMAND_PAGES>();
  for (const p of DEMAND_PAGES) {
    const g = groups.get(p.roleTitle) ?? [];
    g.push(p);
    groups.set(p.roleTitle, g);
  }
  const ordered = [...groups.entries()].sort(
    (a, b) => b[1].reduce((s, p) => Math.max(s, p.sample), 0) - a[1].reduce((s, p) => Math.max(s, p.sample), 0),
  );

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--tx)', minHeight: '100vh', overflowX: 'hidden' }}>
      <SiteHeader campaign={campaign} />
    <main>
      <section style={{ padding: '40px 0 8px' }}>
        <div className="wrap">
          <h1 style={{ maxWidth: 920, fontSize: 'clamp(34px,4vw,56px)', lineHeight: 1.08, fontWeight: 600, letterSpacing: '-0.025em' }}>
            Skills in demand, by role and industry
          </h1>
          <p style={{ marginTop: 24, maxWidth: 740, fontSize: 17, lineHeight: 1.62, color: 'var(--tx2)' }}>
            Each page shows the skills employers name most often in live job postings for one role group, across all industries or
            inside one industry. The numbers come from the SkillDrift job index, read on {SNAPSHOT_LABEL}.
          </p>
        </div>
      </section>
      {ordered.map(([role, pages], i) => (
        <section key={role} className={i % 2 === 0 ? 'sect sect--alt' : 'sect'}>
          <div className="wrap">
            <h2 style={{ fontSize: 'clamp(24px,2.6vw,36px)', fontWeight: 600, letterSpacing: '-0.02em' }}>{role}</h2>
            <ul style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: '10px 32px', listStyle: 'none', padding: 0 }}>
              {pages
                .sort((a, b) => (a.industryKey ? 1 : 0) - (b.industryKey ? 1 : 0) || b.sample - a.sample)
                .map((p) => (
                  <li key={p.slug} style={{ fontSize: 16 }}>
                    <Link href={`/skills/in-demand/${p.slug}`} style={{ color: 'var(--tx)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                      {p.industryLabel ? `${p.roleTitle} in ${p.industryLabel}` : `${p.roleTitle}, all industries`}
                    </Link>
                    <span style={{ color: 'var(--tx3)' }}> · {fmt(p.sample)} postings</span>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ))}
      <section className="sect">
        <div className="wrap">
          <p style={{ maxWidth: 740, fontSize: 16, lineHeight: 1.62, color: 'var(--tx2)' }}>
            For a written guide to one role, see <Link href="/skills" style={{ color: 'var(--tx)', textDecoration: 'underline', textUnderlineOffset: 3 }}>skills by role</Link>. To see
            which of these skills your own resume shows, use the <Link href="/ats-score-checker" style={{ color: 'var(--tx)', textDecoration: 'underline', textUnderlineOffset: 3 }}>ATS score checker</Link>.
          </p>
        </div>
      </section>
    </main>
      <SiteFooter campaign={campaign} />
    </div>
  );
}

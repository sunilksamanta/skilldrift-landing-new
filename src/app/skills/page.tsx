// app/skills/page.tsx  The hub: https://www.skilldrift.ai/skills
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { campaignFor } from "@/lib/cta";
import { ArrowRight } from "@/components/icons";
import { Pill } from "@/components/SectionBits";
import { LIVE_ROLES } from '@/lib/roles';

const URL = 'https://www.skilldrift.ai/skills';
const TITLE = 'Skills Needed for a Job: Role by Role, 2026 | SkillDrift';
const DESCRIPTION =
  'What employers ask for, role by role, and how to check your own resume against a real job. Software engineer, sales, HR, product manager and more.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', siteName: 'SkillDrift', locale: 'en_US', title: TITLE, description: DESCRIPTION, url: URL },
};

export default function SkillsHub() {
  const campaign = campaignFor('/skills');
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--tx)', minHeight: '100vh', overflowX: 'hidden' }}>
      <SiteHeader campaign={campaign} />
      <main>
        <section style={{ padding: '28px 0 8px' }}>
          <div className="wrap">
            <h1 style={{ maxWidth: 900, fontSize: 'clamp(36px,4.2vw,58px)', lineHeight: 1.08, fontWeight: 600, letterSpacing: '-0.025em' }}>
              Skills needed for a job, role by role
            </h1>
            <p style={{ marginTop: 24, maxWidth: 720, fontSize: 17, lineHeight: 1.62, color: 'var(--tx2)' }}>
              The skills a job needs depend on the role and on the posting. Pick a role to see what employers ask for,
              which skills decide the offer, and how to show them on your resume.
            </p>
          </div>
        </section>
        <section className="sect sect--alt">
          <div className="wrap">
            <Pill>Pick a role</Pill>
            <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 48, alignItems: 'end' }}>
              <h2 style={{ fontSize: 'clamp(28px,3.1vw,44px)', lineHeight: 1.13, fontWeight: 600, letterSpacing: '-0.025em' }}>
                What each role asks for, and what decides the offer
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.62, color: 'var(--tx2)' }}>
                Each page lists the technical and human skills employers name most, the few that separate candidates
                at interview, and how to show them on a resume. Every page ends with a free check against a real job.
              </p>
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 20 }}>
              {LIVE_ROLES.map((r, i) => {
                const skillCount = r.groups.reduce((sum, g) => sum + g.skills.length, 0);
                return (
                  <li key={r.slug} style={{ display: 'flex' }}>
                    <Link href={`/skills/${r.slug}`} className="sd-role-card" aria-label={`${r.roleTitle} skills`}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                        <span className="sd-role-card__num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="sd-role-card__arrow" aria-hidden="true">
                          <ArrowRight size={18} />
                        </span>
                      </div>
                      <h3 style={{ marginTop: 22, fontSize: 21, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                        {r.roleTitle} skills
                      </h3>
                      <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, color: 'var(--tx2)', flex: 1 }}>{r.description}</p>
                      <p style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--tx3)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        <span>{skillCount} skills</span>
                        <span>{r.decides.length} that decide the offer</span>
                        <span>{r.faqs.length} questions answered</span>
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="sect">
          <div className="wrap">
            <p style={{ maxWidth: 720, fontSize: 16, lineHeight: 1.62, color: 'var(--tx2)' }}>
              Want the list for your own target role? Upload your resume on the{' '}
              <Link href="/ats-score-checker" style={{ color: 'var(--tx)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                ATS score checker
              </Link>{' '}
              and SkillDrift names the skills the role asks for that your resume does not show yet.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter campaign={campaign} />
    </div>
  );
}

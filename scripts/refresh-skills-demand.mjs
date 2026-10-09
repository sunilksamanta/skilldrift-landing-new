// scripts/refresh-skills-demand.mjs
//
// Rebuilds lib/skillsDemand.ts from the live job index. Run monthly, then deploy.
//
//   JOBS_API_TOKEN=<admin or service token> node scripts/refresh-skills-demand.mjs
//
// Optional:
//   JOBS_API_BASE   default https://jobservice.skilldrift.ai
//   --from-file <path>   build from a saved snapshot instead of the API (used for testing)
//
// Rules, kept identical to the first build on 1 October 2026:
//   * one page per role group, and per role group inside one industry
//   * publish a slice only if it has at least 1,000 postings, the API returns its skills
//     in descending count order, and its top skill is named in at least 10% of postings
//   * no country filter is ever applied

import { readFileSync, writeFileSync } from 'node:fs';

const BASE = process.env.JOBS_API_BASE || 'https://jobservice.skilldrift.ai';
const MIN_SAMPLE = 1000;
const MIN_TOP_PCT = 10;

const ROLE = {
  engineering: 'engineering', operations: 'operations', sales: 'sales', data_ai: 'data and AI',
  finance: 'finance', marketing: 'marketing', design: 'design', customer_support: 'customer support',
  hr: 'HR', education: 'education', product: 'product', healthcare: 'healthcare', creative: 'creative',
  research: 'research', legal: 'legal', manufacturing: 'manufacturing', logistics: 'logistics',
};
const ROLE_TITLE = Object.fromEntries(Object.entries(ROLE).map(([k, v]) => [k, v[0].toUpperCase() + v.slice(1)]));
ROLE_TITLE.hr = 'HR';
ROLE_TITLE.data_ai = 'Data and AI';

const IND = {
  government_nonprofit: 'government and non-profit', pharma: 'pharma', automotive: 'automotive',
  healthtech: 'health tech', telecom: 'telecom', manufacturing: 'manufacturing', real_estate: 'real estate',
  edtech: 'edtech', ecommerce: 'e-commerce', logistics: 'logistics', retail: 'retail', software: 'software',
  media_entertainment: 'media and entertainment', hospitality: 'hospitality', fintech: 'fintech',
  energy: 'energy', consulting: 'consulting',
};

// Hand-written role guides already live at /skills/<slug>
const GUIDES = {
  engineering: [['software-engineer', 'Software engineer skills']],
  sales: [['sales-executive', 'Sales executive skills']],
  hr: [['human-resources', 'Human resources skills']],
  product: [['product-manager', 'Product manager skills']],
  data_ai: [['data-analyst', 'Data analyst skills'], ['data-scientist', 'Data scientist skills']],
  customer_support: [['customer-service', 'Customer service skills']],
  marketing: [['marketing', 'Marketing skills']],
  finance: [['accountant', 'Accountant skills']],
};

const SKILL_CASE = {
  sql: 'SQL', python: 'Python', 'ci/cd': 'CI/CD', aws: 'AWS', gst: 'GST', tds: 'TDS', seo: 'SEO', crm: 'CRM',
  gmp: 'GMP', 'gd&t': 'GD&T', dfmea: 'DFMEA', 'power bi': 'Power BI', 'ui/ux design': 'UI/UX design',
  'node.js': 'Node.js', javascript: 'JavaScript', typescript: 'TypeScript', postgresql: 'PostgreSQL',
  react: 'React', java: 'Java', git: 'Git', css: 'CSS', html: 'HTML', docker: 'Docker', kubernetes: 'Kubernetes',
  linux: 'Linux', azure: 'Azure', figma: 'Figma', jira: 'Jira', excel: 'Excel', 'ms excel': 'MS Excel',
  'ms office': 'MS Office', 'microsoft excel': 'Microsoft Excel', 'google ads': 'Google Ads',
  'google analytics': 'Google Analytics', 'meta ads': 'Meta Ads', 'google sheets': 'Google Sheets',
  'adobe premiere pro': 'Adobe Premiere Pro', 'after effects': 'After Effects',
  'adobe after effects': 'Adobe After Effects', 'adobe photoshop': 'Adobe Photoshop',
  'adobe illustrator': 'Adobe Illustrator', photoshop: 'Photoshop', autocad: 'AutoCAD', solidworks: 'SolidWorks',
  pandas: 'pandas', pytorch: 'PyTorch', tensorflow: 'TensorFlow', tableau: 'Tableau', 'spring boot': 'Spring Boot',
  'b2b sales': 'B2B sales', powerpoint: 'PowerPoint', 'english communication': 'English communication',
  kyc: 'KYC', aml: 'AML', 'hipaa compliance': 'HIPAA compliance',
};

const disp = (s) => SKILL_CASE[s] ?? s[0].toUpperCase() + s.slice(1);
const tcase = (t) =>
  t.split(' ').map((w) => (w === 'and' || w === 'AI' || w === 'HR' ? w : w === 'e-commerce' ? 'E-commerce' : w[0].toUpperCase() + w.slice(1))).join(' ');
const fmtInt = (n) => n.toLocaleString('en-US');
const pct = (p) => {
  const s = p.toFixed(1);
  return s.endsWith('.0') ? s.slice(0, -2) : s;
};
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

async function fetchSlices() {
  const token = process.env.JOBS_API_TOKEN;
  if (!token) throw new Error('Set JOBS_API_TOKEN');
  const jobs = [];
  for (const role of Object.keys(ROLE)) for (const ind of [null, ...Object.keys(IND)]) jobs.push([role, ind]);
  const out = [];
  let i = 0;
  const worker = async () => {
    while (i < jobs.length) {
      const [role, ind] = jobs[i++];
      const q = new URLSearchParams({ role });
      if (ind) q.set('industry', ind);
      const res = await fetch(`${BASE}/admin/v1/kpis/skills-demand-card?${q}`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(`${role}/${ind}: HTTP ${res.status}`);
      const j = await res.json();
      out.push({ role, ind, sample: j.data.sample, items: j.data.items.map((x) => [x.skill, x.count, x.pct]) });
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  return out;
}

function readSnapshot(path) {
  return readFileSync(path, 'utf8').trim().split('\n').map((line) => {
    const [role, ind, sample, sk] = line.split('|');
    return { role, ind: ind === '-' ? null : ind, sample: Number(sample), items: sk.split(';').map((x) => { const [n, c, p] = x.split('~'); return [n, Number(c), Number(p)]; }) };
  });
}

const args = process.argv.slice(2);
const fromFile = args.includes('--from-file') ? args[args.indexOf('--from-file') + 1] : null;
const snapshotDate = process.env.SNAPSHOT_DATE || new Date().toISOString().slice(0, 10);
const [y, m, d] = snapshotDate.split('-').map(Number);
const snapshotLabel = `${d} ${MONTHS[m - 1]} ${y}`;
const monthYear = `${MONTHS[m - 1]} ${y}`;

const raw = fromFile ? readSnapshot(fromFile) : await fetchSlices();

const pages = [];
for (const { role, ind, sample, items } of raw) {
  if (!ROLE[role] || sample < MIN_SAMPLE || !items.length) continue;
  const counts = items.map((x) => x[1]);
  const sortedOk = counts.every((c, k) => k === 0 || counts[k - 1] >= c);
  if (!sortedOk || items[0][2] < MIN_TOP_PCT) continue;
  const r = ROLE[role];
  const slug = ind ? `${role.replace('_', '-')}-jobs-in-${ind.replace('_', '-')}` : `${role.replace('_', '-')}-jobs`;
  const where = ind ? `${r} jobs in ${IND[ind]}` : `${r} jobs`;
  const whereTitle = ind ? `${tcase(r)} Jobs in ${tcase(IND[ind])}` : `${tcase(r)} Jobs`;
  const [a, b, c] = items;
  pages.push({
    slug,
    roleKey: role,
    industryKey: ind,
    roleLabel: r,
    roleTitle: ROLE_TITLE[role],
    industryLabel: ind ? IND[ind] : null,
    where,
    title: `Skills Employers Ask For in ${whereTitle}, ${monthYear} | SkillDrift`,
    description: `The skills named most often in ${fmtInt(sample)} ${where}: ${items.slice(0, 4).map((x) => disp(x[0])).join(', ')}. Live job index data, and a way to check your own resume against them.`,
    h1: `Skills employers ask for in ${where}`,
    answer: `In ${fmtInt(sample)} ${where} in the SkillDrift job index, the most requested skill is ${disp(a[0])}, named in ${pct(a[2])}% of postings. ${disp(b[0])} follows at ${pct(b[2])}%, then ${disp(c[0])} at ${pct(c[2])}%.`,
    sample,
    skills: items.map(([n, cnt, p]) => ({ name: disp(n), count: cnt, pct: p })),
    guides: (GUIDES[role] || []).map(([s, l]) => ({ href: `/skills/${s}`, label: l })),
  });
}
pages.sort((p, q) => (p.roleTitle === q.roleTitle ? (p.industryLabel ?? '').localeCompare(q.industryLabel ?? '') : p.roleTitle < q.roleTitle ? -1 : 1));

const ts = `// lib/skillsDemand.ts  Generated ${snapshotLabel} from the SkillDrift job index.
//
// One object per page at /skills/in-demand/<slug>. Do not edit by hand.
// To refresh: run scripts/refresh-skills-demand.mjs with JOBS_API_TOKEN set, which rewrites this file.
//
// Each page is one slice of the index: a role category, optionally inside one industry.
// A slice is published only if it has at least 1,000 postings, the API returned its skills in
// count order, and its top skill is named in at least 10% of postings.

export type DemandSkill = { name: string; count: number; pct: number };
export type DemandLink = { href: string; label: string };

export type DemandPage = {
  slug: string;
  roleKey: string;
  industryKey: string | null;
  roleLabel: string;
  roleTitle: string;
  industryLabel: string | null;
  where: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  sample: number;
  skills: DemandSkill[];
  guides: DemandLink[];
};

export const SNAPSHOT_DATE = '${snapshotDate}';
export const SNAPSHOT_LABEL = '${snapshotLabel}';

export const DEMAND_PAGES: DemandPage[] = ${JSON.stringify(pages, null, 2)};

export const getDemandPage = (slug: string) => DEMAND_PAGES.find((p) => p.slug === slug);

// Same role, other industries (and the all-industries page), largest first.
export const sameRole = (p: DemandPage) =>
  DEMAND_PAGES.filter((q) => q.roleKey === p.roleKey && q.slug !== p.slug).sort((a, b) => b.sample - a.sample);

// Same industry, other roles, largest first. Empty for an all-industries page.
export const sameIndustry = (p: DemandPage) =>
  p.industryKey
    ? DEMAND_PAGES.filter((q) => q.industryKey === p.industryKey && q.slug !== p.slug).sort((a, b) => b.sample - a.sample)
    : [];
`;

const target = new URL('../src/lib/skillsDemand.ts', import.meta.url);
writeFileSync(target, ts);
console.log(`Wrote ${pages.length} pages to src/lib/skillsDemand.ts (snapshot ${snapshotDate}).`);

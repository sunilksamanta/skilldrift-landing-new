// Product screenshots used on the templated pages (roles, in-demand skills,
// ATS checker). Two real job analyses from test users with neutral names: an
// experienced Data Analyst role and an internship. Pages alternate between them
// so the site shows a mix of goals, not only internships.
export type MatchShot = { desktop: string; mobile: string; alt: string };

export const MATCH_EXPERIENCED: MatchShot = {
  desktop: '/assets/shots/job-match-analysis.png',
  mobile: '/assets/shots/m-job-match-analysis.png',
  alt: 'A real Data Analyst job for someone with experience, scored 70 out of 100 in SkillDrift, with the six skills the person already has and the four to close',
};

export const MATCH_INTERNSHIP: MatchShot = {
  desktop: '/assets/shots/job-match-analysis-intern.png',
  mobile: '/assets/shots/m-job-match-analysis-intern.png',
  alt: 'A real internship scored 75 out of 100 in SkillDrift, with the five skills the person already has and the three to close',
};

/** Alternates by position so neighbouring pages show different goals. */
export function matchShotFor(index: number): MatchShot {
  return index % 2 === 0 ? MATCH_EXPERIENCED : MATCH_INTERNSHIP;
}
